import log from '../log';
import * as EventEmitter from 'events';

const { autoUpdater } = require('electron-updater');

/**
 * TODO(incomingstick): keep default settings saved always as the config file, and when a user changes settings
 * create a new, user specific settings file
 */

let TEST_GLOBAL = 0;

export interface UpdateService {
    isUpdateAvailable(): Promise<boolean>;
    startCheckingForUpdates(): Promise<void>;
    pauseCheckingForUpdates(): Promise<void>;
    events(): EventEmitter;
}

export default function updateServiceFactory(callback: any) {
    const emitter = new EventEmitter();

    // TODO time since last update
    let updateTimerHandle: any = null;

    autoUpdater.logger = log;
    autoUpdater.allowPrerelease = true;

    /**
     * PerformUpdateCheck
     *
     * Performs a single check for whether we shoud download data from the server.
     */
    async function performUpdateCheck() {
        log.debug('[Update Serviice] called performUpdateCheck');
        emitter.emit('update-check-started');

        autoUpdater.checkForUpdates();

        try {
            log.debug('this has been called ', TEST_GLOBAL++, ' times');
            autoUpdater.on('update-not-available', () => {
                emitter.emit('update-unavailable');
            });

            autoUpdater.on('update-available', () => {
                emitter.emit('update-available');
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
         * StartCheckingForUpdates
         *
         * Begins the update cycle and starts to sync new data from server to client
         */
        async startCheckingForUpdates() {
            const updateTimerInMinutes = 5;

            if (updateInProgress) {
                return;
            }

            log.debug('[Update Serviice] called startCheckingForUpdates');
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
                updateTimerHandle = setTimeout(() => this.startCheckingForUpdates(), updateTimerInMinutes * 1000 * 60);
            }
        },

        /**
         * StopCheckingForUpdates
         */
        stopCheckingForUpdates() {
            log.debug('[Update Serviice] called stopCheckingForUpdates');
            if (updateTimerHandle) {
                clearTimeout(updateTimerHandle);
                updateTimerHandle = null;
            }
        }
    };

    callback(null, factory);
}
