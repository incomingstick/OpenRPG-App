import log from './log';
import settings from 'electron-settings';
import { EventEmitter } from 'events';
import _ from 'lodash';

type TSettingsData = {
    currentScreen: string;
    openChars: string[];
};

const DEFAULT_SETTINGS: TSettingsData = {
    currentScreen: 'welcome',
    openChars: []
};

export default class SettingsWrapper extends EventEmitter {
    public settingsLoaded: boolean;

    private data: TSettingsData;
    private settingsPath: string;

    public constructor(path: string) {
        super();
        this.data = _.clone(DEFAULT_SETTINGS);
        this.settingsPath = path;
        this.settingsLoaded = false;

        settings.setPath(this.settingsPath);
    }

    public load = () => {
        const settingsObj = settings.getAll();
        log.info('[Settings] loaded settings object: ', settingsObj);
    };

    public save = () => {
        settings.setAll(this.data, { prettify: true });
    };

    public getData = () => this.data;
}
