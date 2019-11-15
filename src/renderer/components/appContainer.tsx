import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Grid } from 'semantic-ui-react';
import Sidebar from './sidebar';
import CharacterScreen from './characterScreen';
import CampaignScreen from './campaign';
import CitiesScreen from './cities';
import SettingsScreen from './settings';
import WorldMapsScreen from './worldMaps';
import WelcomeScreen from './welcome';
import { PACKAGE_VERSION, NODE_VERSION, CHROME_VERSION, ELECTRON_VERSION } from '../../common/globals';

type TAppContainerState = {
    screen: string;
    aboutModalOpen: boolean;
};

class AppContainer extends React.Component<any, TAppContainerState> {
    public constructor(props: any, context?: any) {
        super(props, context);
        this.state = {
            screen: 'welcome',
            aboutModalOpen: false
        };
    }

    public render() {
        document.title = 'OpenRPG Client v' + PACKAGE_VERSION;

        return (
            <>
                <div id='wrapper'>
                    <Grid>
                        <Grid.Column className='navbar navbar-fixed-top js-nav' id='sidebar-wrapper' role='navigation'>
                            <Sidebar clickCallback={this.sidebarCallback} />
                        </Grid.Column>

                        <main id='main-content-wrapper'>
                            <this.CurrentScreen />
                        </main>
                        {/* <!-- end main-content-wrapper --> */}
                    </Grid>
                </div>
                {/* <!-- end wrapper --> */}

                <footer>
                    <div className='container'>
                        <p>
                            We are using OpenRPG {PACKAGE_VERSION}, node {NODE_VERSION}, Chrome {CHROME_VERSION}, and
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
