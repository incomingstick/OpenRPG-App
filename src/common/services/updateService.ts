import log from '../log';
import { IConfigService } from './configService';
import * as EventEmitter from 'events';
import { autoUpdater } from 'electron-updater';

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

    autoUpdater.logger = log;

    /**
     * PerformUpdateCheck
     *
     * Performs a single check for whether we shoud download data from the server.
     */
    async function performUpdateCheck() {
        emitter.emit('update-check-started');

        autoUpdater.checkForUpdatesAndNotify();

        try {
            autoUpdater.on('update-available', () => {
                emitter.emit('update-completed');
            });
        } catch (e) {
            emitter.emit('update-failed');
            throw e;
        }
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
