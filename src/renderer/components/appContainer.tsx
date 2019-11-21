import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Sidebar from './layout/sidebar';
import Titlebar from './layout/titlebar';
import CharacterScreen, { TCharacterState, TCharacterSaveState } from './characters/characterScreen';
import CampaignScreen from './campaign';
import CitiesScreen from './cities';
import SettingsScreen from './settings';
import WorldMapsScreen from './worldMaps';
import WelcomeScreen from './welcome';

type TAppContainerState = {
    screen: string;
    aboutModalOpen: boolean;
    characterScreenState?: TCharacterState;
};

class AppContainer extends React.Component<any, TAppContainerState> {
    private characterState: TCharacterSaveState;

    public constructor(props: any, context?: any) {
        super(props, context);

        this.state = {
            screen: 'welcome',
            aboutModalOpen: false
        };

        this.characterState = {
            names: [],
            currIndex: 0
        };
    }

    public render() {
        return (
            <>
                <Titlebar />
                <div id='wrapper'>
                    <div id='sidebar-wrapper' role='navigation'>
                        <Sidebar clickCallback={this.sidebarCallback} />
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
        this.setState({ screen: callbackData });
    };

    private characterScreenCallback = (state: TCharacterSaveState) => {
        this.characterState = state;
    };

    private CurrentScreen = () => {
        if (this.state.screen === 'characters')
            return (
                <CharacterScreen
                    characterSaveState={this.characterState}
                    characterSaveCallback={this.characterScreenCallback}
                />
            );
        else if (this.state.screen === 'cities') return <CitiesScreen />;
        else if (this.state.screen === 'world-maps') return <WorldMapsScreen />;
        else if (this.state.screen === 'campaign') return <CampaignScreen />;
        else if (this.state.screen === 'settings') return <SettingsScreen />;
        else return <WelcomeScreen />;
    };
}

const App = () => <AppContainer />;

export default hot(App);
