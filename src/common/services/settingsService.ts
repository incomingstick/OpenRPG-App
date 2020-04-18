import { app } from 'electron';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import _ from 'lodash';
import * as os from 'os';
import * as Path from 'path';
import log from '../log';
import { BUILD_TYPE, DEBUG } from '../globals';
import { CharacterSaveState } from '../../renderer/components/characterScreen';

// TODO(incomingstick): Can we take advantage of electron-settings at all here?

export type SettingsData = {
    settingsFormat: string;
    appVersion: string;
    dataFolder: string;
    channel: string;
    updateTimerMinutes: number;
    hostURL: string;
    lastWindow: string;
    openCharacters: CharacterSaveState;
    zoomLevel?: number;
};

// If the settings formats differ then we revert to the original default settings
// TODO(incomingstick): Warn users when this is updated as their settings will reset
const SETTINGS_FORMAT = '2020-02-01';

const DEFAULT_SETTINGS: SettingsData = {
    settingsFormat: SETTINGS_FORMAT,
    appVersion: app.getVersion(),
    dataFolder: detectDataFolder(),
    channel: BUILD_TYPE,
    updateTimerMinutes: 5,
    hostURL: '',
    lastWindow: '',
    openCharacters: {
        currIndex: 0,
        characters: []
    }
};

function isDir(path: string) {
    try {
        const st = fs.statSync(path);
        return st.isDirectory();
    } catch (e) {
        return false;
    }
}

// TODO(incomingstick): where does our data go when this app is install. This currently assumes that
// Openrpg-libs are already installed on the system
function detectDataFolder(): string {
    const checkFolders: string[] = [];

    if (DEBUG) {
        checkFolders.push(Path.join(process.cwd(), '/node_modules/openrpg-libs'));
    }

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

        case 'Linux': {
            checkFolders.push('/usr/share/openrpg');
            checkFolders.push('/usr/local/share/openrpg');

            break;
        }

        default: {
            log.warn('[Settings] OS Type not Supported. Could not find data folder.');
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

export interface ISettingsService {
    restore(): void;
    isLoaded(): void;
    restoreDefaults(): void;
    save(): void;
    get(): SettingsData;
    merge(settings: any): void;
    clear(): void;
}

export class SettingsService extends EventEmitter implements ISettingsService {
    private settingsData: SettingsData;
    private settingsPath: string;
    private settingsLoaded: boolean;

    public constructor(path: string) {
        super();
        this.settingsData = _.clone(DEFAULT_SETTINGS);
        this.settingsPath = path;
        this.settingsLoaded = false;
    }

    // Public Functions
    public restore() {
        log.debug(`[Settings] Loading from ${this.settingsPath}`);
        try {
            const encodedJson = fs.readFileSync(this.settingsPath, 'utf8');
            const parsedJson = JSON.parse(encodedJson);

            log.debug('[Settings] loaded as json: ', parsedJson);

            if (parsedJson.settingsFormat === SETTINGS_FORMAT) {
                this.settingsData = _.extend({}, DEFAULT_SETTINGS, parsedJson);
            } else {
                log.debug(
                    `[Settings] Settings format has changed. Old = ${parsedJson.settingsFormat}, New = ${DEFAULT_SETTINGS} -- resetting settings`
                );
                this.restoreDefaults();
                this.save();
            }
        } catch (e) {
            log.error('[Settings] Failed to restore settings - loading defaults', e);
            this.restoreDefaults();
            this.save();
        }
    }

    public isLoaded() {
        return this.settingsLoaded;
    }

    public restoreDefaults() {
        log.debug('[Settings] Restoring defaults');
        this.settingsData = _.clone(DEFAULT_SETTINGS);
    }

    public save() {
        log.debug('[Settings] Saving...');
        fs.writeFileSync(this.settingsPath, JSON.stringify(this.settingsData, null, 2), 'utf8');
        this.triggerSettingsUpdated();
    }

    public get(): SettingsData {
        return this.settingsData;
    }

    public merge(settings: any) {
        this.settingsData = _.extend(_.clone(DEFAULT_SETTINGS), this.settingsData, settings);
        this.triggerSettingsUpdated();
    }

    public clear() {
        this.settingsData = _.clone(DEFAULT_SETTINGS);
        this.triggerSettingsUpdated();
    }

    // Private functions
    private triggerSettingsUpdated() {
        log.debug('[Settings] Settings have been updated ...');
        this.emit('updated', this.settingsData);
    }
}

export default function settings_service(callback: any) {
    // Save to the user-specific app location.
    //
    // NOTE: When running in development mode this will be a "Electron" folder,
    // But production builds will properly save to an OpenRPG folder.
    // See here for more: https://www.bountysource.com/issues/43448486-beta-app-getpath-userdata-returns-electron-default
    const path = Path.join(app.getPath('userData'), 'config.json');
    const settings = new SettingsService(path);
    settings.restore();

    callback(null, settings);
}
