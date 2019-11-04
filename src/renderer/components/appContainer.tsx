import { remote } from 'electron';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Grid } from 'semantic-ui-react';
import Sidebar from './sidebar';
import CharacterScreen from './characters';
import CampaignScreen from './campaign';
import CitiesScreen from './cities';
import SettingsScreen from './settings';
import WorldMapsScreen from './worldMaps';
import WelcomeScreen from './welcome';

const ORPG_VERSION = remote.app.getVersion();
const NODE_VERSION = process.versions.node;
const CHROME_VERSION = process.versions.chrome;
const ELECTRON_VERSION = process.versions.electron;

type TAppContainerState = {
    screen: string;
    aboutModalOpen: boolean;
};

class AppContainer extends React.Component<any, TAppContainerState> {
    constructor(props: any, context?: any) {
        super(props, context);
        this.state = {
            screen: 'welcome',
            aboutModalOpen: false
        };
    }

    public render() {
        document.title = `OpenRPG Client v` + ORPG_VERSION;

        return (
            <>
                <div id='wrapper'>
                    <Grid>
                        <Grid.Column className='navbar navbar-fixed-top js-nav' id='sidebar-wrapper' role='navigation'>
                            <Sidebar parentCallback={this.sidebarCallback} />
                        </Grid.Column>

                        {/* <Grid.Column stretched width={12}> */}
                        <main id='main-content-wrapper' className='content js-content is-shown'>
                            <this.CurrentScreen />
                        </main>
                        {/* <!-- end main-content-wrapper --> */}
                        {/* </Grid.Column> */}
                    </Grid>
                </div>
                {/* <!-- end wrapper --> */}

                <footer>
                    <div className='container'>
                        <p>
                            We are using OpenRPG {ORPG_VERSION}, node {NODE_VERSION}, Chrome {CHROME_VERSION}, and
                            Electron {ELECTRON_VERSION}.
                        </p>
                    </div>
                </footer>
            </>
        );
    }

    private sidebarCallback = (callbackData: string) => {
        this.setState({ screen: callbackData });
    };

    private CurrentScreen = () => {
        if (this.state.screen === 'characters') return <CharacterScreen />;
        else if (this.state.screen === 'cities') return <CitiesScreen />;
        else if (this.state.screen === 'world-maps') return <WorldMapsScreen />;
        else if (this.state.screen === 'campaign') return <CampaignScreen />;
        else if (this.state.screen === 'settings') return <SettingsScreen />;
        else return <WelcomeScreen />;
    };
}

const App = () => <AppContainer />;

export default hot(App);
