import * as crypto from 'crypto';
import { promisify } from 'util'; // TODO: move to util.promisify when we are on a newer version of node
import * as fs from 'fs';
import Mkpath from 'mkpath';
import fetch from 'electron-fetch';
import * as path from 'path';
import * as zlib from 'zlib';
import log from '../log';
import { IConfigService } from './configService';
import * as EventEmitter from 'events';

const gunzip = promisify(zlib.gunzip);
const writeFile = promisify(fs.writeFile);
const mkpath = promisify(Mkpath);

export interface IUpdateService {
    isUpdateAvailable(): Promise<boolean>;
    startCheckingForUpdates(): Promise<void>;
    pauseCheckingForUpdates(): Promise<void>;
    events(): EventEmitter;
}

export default function updateServiceFactory(config: IConfigService, callback: Function) {
    const emitter = new EventEmitter();

    // TODO time since last update
    let updateTimerHandle: any = null;

    /**
     * PerformUpdateCheck
     *
     * Performs a single check for whether we shoud download data from the server.
     */
    async function performUpdateCheck() {
        emitter.emit('update-check-started');

        const configJSON = await getJsonFromUrl(getChannelConfigUrl());

        if (!factory.isManifestVersionOutdated(configJSON.manifest_version)) {
            // Already in sync
            log.info(`[Updater] Already in sync with latest version ${configJSON.manifest_version}`);

            // TODO: checking the config is OK, but not 100% great, because the installed version
            // Could actually be different. The only way to know for sure would be to check the
            // Actual files and see if the SHA checksums differ from what is expected on the server.
            //
            // This takes a good bit of effort, but I feel we might want to do something like this.

            emitter.emit('update-unnecessary');

            return;
        }

        log.info(
            `[Updater] New version detected: "${configJSON.manifest_version}" vs "${
                config.get().installedManifest ? config.get().installedManifest.version : 'N/A'
            }". Beginning sync process...`
        );

        const manifest = await getJsonFromUrl(configJSON.manifest_url);

        // Remove the file part from the URL
        const urlParts = configJSON.manifest_url.split('/');
        const manifestRootUrl = urlParts.splice(0, urlParts.length - 1).join('/') + '/';

        try {
            await syncManifest(manifestRootUrl, manifest);
            emitter.emit('update-completed');
        } catch (e) {
            emitter.emit('update-failed');
            throw e;
        }
    }

    /**
     * SyncManifest
     *
     * Synchronize the changes files from the server to client.
     * Perhaps this needs to know that certain files can be ignored, like if a user doesn't want a certain region.
     */
    async function syncManifest(rootUrl: string, manifest: any) {
        let count = 0;
        for (const entry of manifest.files) {
            emitter.emit('update-progress', {
                entry,
                progress: count++ / manifest.files.length
            });

            // TODO: later on we can make it so we run multiple of these at the same
            // Time. We don't want to just do a Promise.all though, because we want to
            // Control how many downloads are happening at once.
            await syncManifestEntry(rootUrl, entry);
        }

        log.info('[Updater] Manifest sync completed');

        config.get().installedManifest = manifest;
        config.save();
    }

    /**
     * SyncManifestEntry
     *
     * Sync a single file from the manifest from server -> verify -> disk
     */
    async function syncManifestEntry(rootUrl: string, entry: any) {
        // TODO: look at entry.region / entry.faction to know whether we should sync this
        // File, though we need to make sure the old file isn't corrupted even if it
        // Wasn't for the current region. Maybe we need to store a record of the previous
        // Checksums?

        log.info(`[Updater] Downloading ${entry.path} ...`);
        const compressedFileData = await downloadFileToMemory(rootUrl + entry.path);

        let fileData: any = compressedFileData;
        if (entry.path.endsWith('.gz')) {
            log.info('[Updater] Uncompressing ...');
            fileData = await uncompressData(compressedFileData);
        }

        log.info('[Updater] Validating checksum ...');
        if (!isMatchingChecksum(compressedFileData, entry.checksum)) {
            throw new Error(`Checksum failed for ${entry.path}`);
        }

        log.info(`[Updater] Saving ${entry.path} to disk ...`);
        await saveToLocalSystem(fileData, entry.path);
    }

    /**
     * UncompressData
     *
     * uncompresses a gzip buffer.
     *
     * TODO: we probably should just move away from this and do inline Content-Encoding: gzip from server.
     * Fetch will handle that natively.
     */
    async function uncompressData(data: any) {
        return await gunzip(Buffer.from(data));
    }

    /**
     * GetBaseUrl
     *
     * Simple helper function to return base URL for all requests (scheme/host).
     * This data is pulled from out clients config.json
     */
    function getBaseUrl() {
        return config.get().hostURL;
    }

    /**
     * GetChannelConfigUrl
     *
     * Get URL for where to read the config file for a specific channel.
     * This data is pulled from out clients config.json
     */
    function getChannelConfigUrl() {
        return `${getBaseUrl()}/addon/channels/${config.get().channel}/config.json`;
    }

    /**
     * GetJsonFromUrl
     *
     * Retrieve a JSON object from the server.
     *
     * Probably should do something where we validate the format of the data.
     */
    async function getJsonFromUrl(jsonUrl: string) {
        const response = await fetch(jsonUrl);
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            // TODO: verify that the data looks correctly formed?
            return await response.json();
        }

        throw new TypeError("[Updater] Oops, we haven't got JSON!");
    }

    /**
     * DownloadFileToMemory
     *
     * TODO: we should probably be streaming straight to disk (tempfile) rather than
     * into memory. This will let us do our verification on the disk and then we can
     * perform an atomic operation (move) to move the file from one place to the other
     * once it has been verified.
     *
     * Right now there's a chance that something could go wrong on writing to the location.
     */
    async function downloadFileToMemory(fileUrl: string) {
        const response = await fetch(fileUrl);
        return response.buffer();
    }

    /**
     * IsMatchingChecksum
     *
     * Returns true if the supplied data matches the given checksum.
     */
    async function isMatchingChecksum(blob: any, checksum: string) {
        const sha256 = crypto.createHash('sha256');

        sha256.update(blob);

        return sha256.digest('hex') === checksum;
    }

    /**
     * SaveToLocalSystem
     *
     * Saves the file data to the local file system in the given path.
     *
     * NOTE: We ignore .gz at the end of the filename, since we are decompressing this file locally.
     */
    async function saveToLocalSystem(buf: Buffer, relativePath: string) {
        let cleanedPath = relativePath;
        if (cleanedPath.endsWith('.gz')) {
            cleanedPath = cleanedPath.substr(0, cleanedPath.length - 3);
        }

        const outputPath = path.join(config.get().dataFolder, 'Interface', 'AddOns', cleanedPath);
        const outputDir = path.dirname(outputPath);

        // TODO: Should we check if the path is visible to the calling process? This is useful for determining
        // If a path exists, but says nothing about rwx permissions. This is the default if no mode is specified.
        // Or should we check if the path can be written to?
        await fs.access(outputDir, fs.constants.F_OK, (err0: any) => {
            if (err0) {
                log.info(`${outputDir} ${err0} 'does not exist attempting to create path`);
                mkpath(outputDir, undefined, (err1: any) => {
                    log.info(`${outputDir} ${err1} 'unable to create path`);
                });
            }
        });

        await writeFile(outputPath, buf);
    }

    let updateInProgress = false;

    const factory = {
        events() {
            return emitter;
        },

        /**
         * IsUpdatedAvailable
         *
         * Check if the server has an updated pending for us
         */
        isManifestVersionOutdated(manifestVersion: string) {
            const conf = config.get();
            return !conf.installedManifest || conf.installedManifest.version !== manifestVersion;
        },

        /**
         * StartCheckingForUpdates
         *
         * Begins the update cycle and starts to sync new addon data from server to client
         */
        async startCheckingForUpdates() {
            if (updateInProgress) {
                return;
            }

            log.info('startCheckingForUpdates');
            if (updateTimerHandle) {
                clearTimeout(updateTimerHandle);
                updateTimerHandle = null;
            }

            updateInProgress = true;

            try {
                await performUpdateCheck();
            } catch (e) {
                throw e;
            } finally {
                updateInProgress = false;
                updateTimerHandle = setTimeout(
                    () => this.startCheckingForUpdates(),
                    config.get().updateTimerMinutes * 1000 * 60
                );
            }
        },

        /**
         * StopCheckingForUpdates
         */
        stopCheckingForUpdates() {
            log.info('stopCheckingForUpdates');
            if (updateTimerHandle) {
                clearTimeout(updateTimerHandle);
                updateTimerHandle = null;
            }
        }
    };

    callback(null, factory);
}
