import { autoInject } from 'async';
import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from 'electron';
import * as log from 'electron-log';
import * as path from 'path';
import * as url from 'url';
import ConfigService from '../common/services/configService';
import UpdateService from '../common/services/updateService';

const { autoUpdater } = require('electron-updater');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any = null;

// Check if we are a release build or not
const DEBUG = process.env.NODE_ENV !== 'production';

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: `OpenRPG Client v` + app.getVersion(),
        backgroundColor: '#363636',
        webPreferences: {
            nodeIntegration: true
        }
    });

    const menuTemplate: any[] = [
        {
            role: 'window',
            submenu: [{ role: 'minimize' }, { role: 'close' }]
        }
    ];

    if (process.platform === 'darwin') {
        menuTemplate.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: 'About OpenRPG',
                    click: async () => {
                        win.webContents.send('show-about-modal');
                    }
                },
                {
                    label: 'Check for Updates...',
                    click: async () => {
                        const results = await autoUpdater.checkForUpdatesAndNotify();
                        if (!results) {
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Checked for Updates',
                                message: 'There are currently no updates available.'
                            });
                        }
                    }
                },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });
    }

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    if (process.platform === 'win32') {
        win.setMenu(null);
    }

    if (DEBUG) {
        win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    } else {
        // and load the index.html of the app.
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    // Open the DevTools.
    if (DEBUG) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    autoUpdater.checkForUpdatesAndNotify();

    // Resolves the dependencies
    autoInject(
        // api
        {
            config: ConfigService,
            updateService: UpdateService
        },
        (err: any, api: any) => {
            if (err) {
                log.error({ err }, 'Dependency loader error');
                return;
            }

            log.info(`Dependency injection completes with APIs: ${Object.keys(api).join(', ')}`);

            api.config.on('updated', () => {
                if (!win) {
                    return;
                }

                win.webContents.send('config-load', api.config.get());
            });

            // asynchronously get the configuration
            ipcMain.on('config-get', () => {
                if (!win) {
                    return;
                }

                win.webContents.send('config-load', api.config.get());
            });

            // synchronously get the configuration
            ipcMain.on('sync-config-get', (event: any) => {
                if (!win) {
                    event.returnValue = {};
                } else {
                    event.returnValue = api.config.get();
                }
            });

            ipcMain.on('config-updated', (event: any, arg: any) => {
                log.info('data folder changed from event', event);
                api.config.merge(arg);
                api.config.save();
            });

            ipcMain.on('check-for-addon-updates', (event: any) => {
                api.updateService.startCheckingForUpdates();
            });

            ipcMain.on('open-url', (event: any, externalUrl: string) => {
                shell.openExternal(externalUrl);
            });

            //
            // Addon Updater Events
            //
            api.updateService.events().on('update-check-started', (event: any) => {
                log.info('update-check-started');
                win.webContents.send('update-check-started');
            });

            api.updateService.events().on('update-available', (event: any) => {
                log.info('update-available');
                win.webContents.send('update-available');
            });

            api.updateService.events().on('update-unnecessary', (event: any) => {
                log.info('update-unnecessary');
                win.webContents.send('update-unnecessary');
            });

            api.updateService.events().on('update-progress', (data: any) => {
                log.info('update-progress', data);
                win.webContents.send('update-progress', data);
            });

            api.updateService.events().on('update-completed', (data: any) => {
                log.info('update-completed', data);
                win.webContents.send('update-completed', data);
            });

            api.updateService.events().on('update-failed', (data: any) => {
                log.info('update-failed', data);
                win.webContents.send('update-failed', data);
            });
        }
    );
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// This is to catch any unhandledRejections from node promises
process.on('unhandledRejection', (reason: any, p: any) => {
    log.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
