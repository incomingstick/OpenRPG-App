import { app } from 'electron';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import _ from 'lodash';
import * as os from 'os';
import * as Path from 'path';
import log from '../log';

type TConfigData = {
    configFormat: string;
    appVersion: string;
    dataFolder: string;
    channel: string;
    installedManifest: any;
    updateTimerMinutes: number;
    hostURL: string;
};

// if the config formats differ then we revert to the original default config
const CONFIG_FORMAT = '2019-09-14';

const DEFAULT_CONFIG: TConfigData = {
    configFormat: CONFIG_FORMAT,
    appVersion: app.getVersion(),
    dataFolder: detectDataFolder(),
    channel: 'alpha',
    installedManifest: {},
    updateTimerMinutes: 5,
    hostURL: 'https://dogesec.us'
};

function isDir(path: string) {
    try {
        const st = fs.statSync(path);
        return st.isDirectory();
    } catch (e) {
        return false;
    }
}

function detectDataFolder(): string {
    const checkFolders: string[] = [];
    switch (os.type()) {
        case 'Darwin': {
            checkFolders.push('/Applications/OpenRPG');
            break;
        }
        case 'Windows_NT': {
            checkFolders.push('c:/Program Files (x86)/OpenRPG');
            checkFolders.push('c:/Program Files/OpenRPG');
            break;
        }
        /* TODO Add Linux Support */
        default: {
            break;
        }
    }

    for (const folder of checkFolders) {
        if (isDir(Path.join(folder, 'data'))) {
            return folder;
        }
    }

    return '';
}

export interface IConfigService {
    restore(): void;
    isLoaded(): void;
    restoreDefaults(): void;
    save(): void;
    get(): TConfigData;
    merge(config: any): void;
    clear(): void;
}

class ConfigService extends EventEmitter implements IConfigService {
    private configData: TConfigData;
    private configPath: string;
    private isConfigLoaded: boolean;

    constructor(path: string) {
        super();
        this.configData = _.clone(DEFAULT_CONFIG);
        this.configPath = path;
        this.isConfigLoaded = false;
    }

    // Public Functions
    public restore() {
        log.info(`[Config] Loading from ${this.configPath}`);
        try {
            const encodedJson = fs.readFileSync(this.configPath, 'utf8');
            const parsedJson = JSON.parse(encodedJson);
            if (parsedJson.configFormat === CONFIG_FORMAT) {
                this.configData = _.extend({}, DEFAULT_CONFIG, parsedJson);
            } else {
                log.info(
                    `[Config] Config format has changed. Old = ${parsedJson.configFormat}, New = ${CONFIG_FORMAT} -- resetting config`
                );
                this.restoreDefaults();
                this.save();
            }
        } catch (e) {
            log.error(`Failed to restore config - loading defaults`, e);
            this.restoreDefaults();
            this.save();
        }
    }

    public isLoaded() {
        return this.isConfigLoaded;
    }

    public restoreDefaults() {
        log.info(`[Config] Restoring defaults`);
        this.configData = _.clone(DEFAULT_CONFIG);
    }

    public save() {
        log.info(`[Config] Saving...`);
        fs.writeFileSync(this.configPath, JSON.stringify(this.configData, null, 2), 'utf8');
        this.triggerConfigUpdated();
    }

    public get(): any {
        return this.configData;
    }

    public merge(config: any) {
        this.configData = _.extend(_.clone(DEFAULT_CONFIG), this.configData, config);
        this.triggerConfigUpdated();
    }

    public clear() {
        this.configData = _.clone(DEFAULT_CONFIG);
        this.triggerConfigUpdated();
    }

    // Private functions
    private triggerConfigUpdated() {
        log.info(`[Config] Config has been updated ...`);
        this.emit('updated', this.configData);
    }
}

export default function config_service(callback: any) {
    // Save to the user-specific app location.
    //
    // NOTE: When running in development mode this will be a "Electron" folder,
    // but production builds will properly save to a RaiderIO folder.
    // See here for more: https://www.bountysource.com/issues/43448486-beta-app-getpath-userdata-returns-electron-default
    const path = Path.join(app.getPath('userData'), 'config.json');
    const config = new ConfigService(path);
    config.restore();

    callback(null, config);
}
