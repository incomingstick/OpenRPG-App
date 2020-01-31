import { autoInject } from 'async';
import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron';
import * as log from 'electron-log';
import * as path from 'path';
import * as url from 'url';
import SettingsService from '../common/services/settingsService';
import UpdateService from '../common/services/updateService';
import { DEBUG } from '../common/globals';

const { autoUpdater } = require('electron-updater');

// Keep a global reference of the window object, if you don't, the window will
// Be closed automatically when the JavaScript object is garbage collected.
let win: any = null;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        backgroundColor: '#201019',
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (DEBUG) {
        win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);

        // Open the DevTools.
        win.webContents.openDevTools();
    } else {
        // And load the index.html of the app.
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // In an array if your app supports multi windows, this is the time
        // When you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// Initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    autoUpdater.logger = log;

    autoUpdater.checkForUpdatesAndNotify();

    // Resolves the dependencies
    autoInject(
        // Api
        {
            settings: SettingsService,
            updateService: UpdateService
        },
        (err: any, api: any) => {
            if (err) {
                log.error('[Main]', { err }, 'Dependency loader error');
                return;
            }

            log.debug(`[Main] Dependency injection completes with APIs: ${Object.keys(api).join(', ')}`);

            api.settings.on('updated', () => {
                if (!win) {
                    return;
                }

                win.webContents.send('settings-load', api.settings.get());
            });

            // Asynchronously get the settings
            ipcMain.on('settings-get', () => {
                if (!win) {
                    return;
                }

                win.webContents.send('settings-load', api.settings.get());
            });

            // Synchronously get the settings
            ipcMain.on('sync-settings-get', (event: any) => {
                if (!win) {
                    event.returnValue = {};
                } else {
                    event.returnValue = api.settings.get();
                }
            });

            ipcMain.on('settings-updated', (event: any, arg: any) => {
                api.settings.merge(arg);
                api.settings.save();
            });

            ipcMain.on('check-for-updates', () => {
                api.updateService.startCheckingForUpdates();
            });

            ipcMain.on('open-url', (event: any, externalUrl: string) => {
                shell.openExternal(externalUrl);
            });

            //
            // Updater Events
            //
            api.updateService.events().on('update-check-started', () => {
                log.debug('[Main] update-check-started');
                win.webContents.send('update-check-started');
            });

            api.updateService.events().on('update-available', () => {
                log.debug('[Main] update-available');
                win.webContents.send('update-available');
            });

            // FIXME(incomingstick): This does not seem to clear after call, resulting in multiple calls building up
            api.updateService.events().on('update-unavailable', () => {
                log.debug('[Main] update-unavailable');

                dialog.showMessageBox({
                    type: 'debug',
                    title: 'OpenRPG',
                    message: 'Hey, listen! No updates are currently available!'
                });

                win.webContents.send('update-unavailable');
            });

            api.updateService.events().on('update-progress', (data: any) => {
                log.debug('[Main] update-progress', data);
                win.webContents.send('update-progress', data);
            });

            api.updateService.events().on('update-completed', (data: any) => {
                log.debug('[Main] update-completed', data);
                win.webContents.send('update-completed', data);
            });

            api.updateService.events().on('update-failed', (data: any) => {
                log.debug('[Main] update-failed', data);
                win.webContents.send('update-failed', data);
            });

            // App events
            app.on('window-all-closed', () => {
                // Save the settings when the App is closed
                api.settings.save();
            });
        }
    );
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // To stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // Dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// Code. You can also put them in separate files and require them here.

// This is to catch any unhandledRejections from node promises
process.on('unhandledRejection', (reason: any, p: any) => {
    log.error('[Main] Unhandled Rejection at: Promise', p, 'reason:', reason);
});
