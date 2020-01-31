import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Sidebar from './layout/sidebar';
import Titlebar, { TTitlebarCallbackData } from './layout/titlebar';
import CharacterScreen, { TCharacterState, TCharacterSaveState } from './characterScreen';
import CampaignScreen from './campaign';
import CitiesScreen from './cities';
import SettingsScreen from './settings';
import WorldMapsScreen from './worldMaps';
import WelcomeScreen, { TWelcomeCallbackData } from './welcome';
import { ipcRenderer, webFrame } from 'electron';
import { TSettingsData } from '../../common/services/settingsService';
import log from '../../common/log';

type TAppContainerState = {
    screen: string;
    settings: TSettingsData;
    characterScreenState?: TCharacterState;
};

export type TControlFunctionMap = {
    control: string;
    functionAlias: string;
    function: (...args: any[]) => void;
}[];

class AppContainer extends React.Component<any, TAppContainerState> {
    private characterState: TCharacterSaveState;
    private controlFuncMap: TControlFunctionMap;

    public constructor(props: any, context?: any) {
        super(props, context);

        const settings = ipcRenderer.sendSync('sync-settings-get') as TSettingsData;

        this.state = {
            settings,
            screen: settings.lastWindow !== '' ? settings.lastWindow : 'welcome'
        };

        this.characterState = {
            names: this.state.settings.openCharacters !== undefined ? this.state.settings.openCharacters : [],
            currIndex: 0
        };

        this.controlFuncMap = [
            {
                control: 'characters',
                functionAlias: 'newCharacter',
                function: () => {
                    log.debug('[App Container] TODO New Character Modal here!');
                }
            }
        ];
    }

    public render() {
        // Apply settings stuff here
        if (this.state.settings.zoomLevel !== undefined) {
            const zoomLevel = this.state.settings.zoomLevel;
            webFrame.setZoomFactor(1.0 + zoomLevel * 0.2);
        }

        return (
            <>
                <Titlebar
                    titlebarCallback={this.titleBarCallback}
                    screen={this.state.screen}
                    controlFuncMap={this.controlFuncMap}
                />
                <div id='wrapper'>
                    <div id='sidebar-wrapper' role='navigation'>
                        <Sidebar clickCallback={this.sidebarCallback} screen={this.state.screen} />
                    </div>

                    <main id='main-content-wrapper'>
                        <this.CurrentScreen />
                    </main>
                </div>
                <footer>
                    <div className='container'>
                        <p>TODO Notification stuff here maybe? And chat stuff maybe?</p>
                    </div>
                </footer>
            </>
        );
    }

    private sidebarCallback = (callbackData: string) => {
        ipcRenderer.send('settings-updated', { lastWindow: callbackData });

        this.setState({ screen: callbackData, settings: ipcRenderer.sendSync('sync-settings-get') as TSettingsData });
    };

    private titleBarCallback = (callbackData: TTitlebarCallbackData) => {
        ipcRenderer.send('settings-updated', { lastWindow: callbackData.screen });

        if (callbackData.action) callbackData.action();
        if (!callbackData.screen) callbackData.screen = 'welcome';

        if (callbackData.screen === 'settings') {
            this.setState({
                screen: callbackData.screen,
                settings: ipcRenderer.sendSync('sync-settings-get') as TSettingsData
            });
        } else {
            this.setState({ screen: callbackData.screen });
        }
    };

    private welcomeScreenCallback = (callbackData: TWelcomeCallbackData) => {
        // TODO(incomingstick): where are we going from the welcome screen?
        ipcRenderer.send('settings-updated', { lastWindow: callbackData.screen });

        if (callbackData.action) callbackData.action();

        if (callbackData.screen === 'characters') {
            this.setState({ screen: callbackData.screen });
        }
    };

    private characterScreenCallback = (state: TCharacterSaveState) => {
        ipcRenderer.send('settings-updated', { openCharacters: state.names });

        this.characterState = state;
    };

    private settingsScreenCallback = () => {
        this.setState({ settings: ipcRenderer.sendSync('sync-settings-get') as TSettingsData });
    };

    private CurrentScreen = () => {
        if (this.state.screen === 'characters')
            return (
                <CharacterScreen
                    characterScreenSaveState={this.characterState}
                    characterScreenSaveCallback={this.characterScreenCallback}
                />
            );
        else if (this.state.screen === 'cities') return <CitiesScreen />;
        else if (this.state.screen === 'world-maps') return <WorldMapsScreen />;
        else if (this.state.screen === 'campaign') return <CampaignScreen />;
        else if (this.state.screen === 'settings')
            // TODO Create settings callback when settings are updated
            return <SettingsScreen settingsScreenSaveCallback={this.settingsScreenCallback} />;
        else
            return (
                <WelcomeScreen
                    welcomeScreenCallback={this.welcomeScreenCallback}
                    controlFuncMap={this.controlFuncMap}
                />
            );
    };
}

const App = () => <AppContainer />;

export default hot(App);
