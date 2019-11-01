// import { ipcRenderer, remote } from 'electron';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Menu } from 'semantic-ui-react';
// import CharacterScreen from './characters';
// import CampaignScreen from './campaign';
// import CitiesScreen from './cities';
// import SettingsScreen from './settings';
// import WorldMapsScreen from './world-maps'
import WelcomeScreen from './welcome';
import { remote } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faBuilding, faMap, faGlobe, faCog } from '@fortawesome/free-solid-svg-icons';

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

        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick = (e: Event | undefined, id: string) => {
        if (e === undefined) {
            console.log('click event ', e, ' is undefined');
            return undefined;
        }

        e.preventDefault();
        console.log('The link was clicked.');
        const button = document.getElementById(id);

        if (button === null) {
            console.log(id, ' button ', button, ' is null');
            return undefined;
        }

        button.click();

        return undefined;
    };

    public render() {
        document.title = `OpenRPG Client v` + ORPG_VERSION;

        return (
            <>
                <div id='wrapper'>
                    <nav className='navbar navbar-fixed-top js-nav' id='sidebar-wrapper' role='navigation'>
                        <Menu fluid vertical tabular className='nav sidebar-nav'>
                            <Menu.Item>
                                <button
                                    type='button'
                                    id='button-welcome'
                                    data-section='welcome'
                                    className='nav-button'
                                    data-toggle='tooltip'
                                    title='Home'>
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        onClick={this.handleClick(event, 'button-welcome')}
                                    />
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                {/* <!-- TODO Is this the correct tooltip --> */}
                                <button
                                    type='button'
                                    id='button-characters'
                                    data-section='character'
                                    className='nav-button'
                                    data-toggle='tooltip'
                                    title='Characters'>
                                    <FontAwesomeIcon
                                        icon={faFile}
                                        onClick={this.handleClick(event, 'button-characters')}
                                    />
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                {/* <!-- TODO Is this the correct tooltip / icon --> */}
                                <button
                                    type='button'
                                    id='button-cities'
                                    data-section='cities'
                                    className='nav-button'
                                    data-toggle='tooltip'
                                    title='Cities and Towns'>
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        onClick={this.handleClick(event, 'button-cities')}
                                    />
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                {/* <!-- TODO Is this the correct tooltip --> */}
                                <button
                                    type='button'
                                    id='button-world-maps'
                                    data-section='world-maps'
                                    className='nav-button'
                                    data-toggle='tooltip'
                                    title='World Maps'>
                                    <FontAwesomeIcon
                                        icon={faMap}
                                        onClick={this.handleClick(event, 'button-world-maps')}
                                    />
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                {/* <!-- TODO Is this the correct tooltip --> */}
                                <button
                                    type='button'
                                    id='button-campaign'
                                    data-section='campaign'
                                    className='nav-button'
                                    data-toggle='tooltip'
                                    title='Campaign'>
                                    <FontAwesomeIcon
                                        icon={faGlobe}
                                        onClick={this.handleClick(event, 'button-campaign')}
                                    />
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                {/* <!-- TODO Is this the correct tooltip --> */}
                                <button
                                    type='button'
                                    id='button-settings'
                                    data-section='settings'
                                    className='nav-button'
                                    data-toggle='tooltip'
                                    title='Settings'>
                                    <FontAwesomeIcon
                                        icon={faCog}
                                        onClick={this.handleClick(event, 'button-settings')}
                                    />
                                </button>
                            </Menu.Item>
                        </Menu>
                    </nav>

                    <main id='main-content-wrapper' className='content js-content is-shown'>
                        <WelcomeScreen />
                    </main>
                    {/* <!-- end main-content-wrapper --> */}
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
}

const App = () => <AppContainer />;

export default hot(App);
