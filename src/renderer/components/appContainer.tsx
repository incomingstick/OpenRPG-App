import { ipcRenderer, remote } from 'electron';
import * as React from 'react';
import { Grid, Icon, Modal } from 'semantic-ui-react';
import CharacterScreen from './characters';
import CampaignScreen from './campaign';
import CitiesScreen from './cities';
import SettingsScreen from './settings';
import WelcomeScreen from './welcome'
import WorldMapsScreen from './world-maps'

type TAppContainerState = {
    screen: string;
    aboutModalOpen: boolean;
};

export default class AppContainer extends React.Component<any, TAppContainerState> {
    constructor(props: any, context?: any) {
        super(props, context);
        this.state = {
            screen: 'addon',
            aboutModalOpen: false
        };
    }

    public render() {
        return <WelcomeScreen />;
    }
}

/* TODO(incomingstick): this is the previous main page
<!DOCTYPE html>
                <html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>OpenRPG</title>

    <!-- Package info (package.json) -->
    <script>
        const { remote } = require('electron');
        const pkginfo = remote.getGlobal('pkginfo');
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') { window.module = module; module = undefined; }</script>

    <!-- jQuery first, then Tether, then Bootstrap -->
    <script>
        window.$ = window.jQuery = require('jquery');
    </script>
    <script src="js/vendor/popper-v1.14.0/popper.min.js"></script>

    <!--Latest compiled and minified bootstrap CSS and JS -->
    <link rel="stylesheet" href="css/vendor/bootstrap-v4.1.0/bootstrap.min.css">
    <script src="js/vendor/bootstrap-v4.1.0/bootstrap.min.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">

    <!-- Our custom CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/section.css">

    <script src="./js/scripts.js"></script>

    <!-- Our page templates and imports -->
    <link rel="import" href="sections/welcome.html">
    <link rel="import" href="sections/characters.html">
    <link rel="import" href="sections/cities.html">
    <link rel="import" href="sections/world-maps.html">
    <link rel="import" href="sections/campaign.html">
    <link rel="import" href="sections/settings.html">
</head>

<body>
    <div id="wrapper">
        <nav class="navbar navbar-fixed-top js-nav" id="sidebar-wrapper" role="navigation">
            <ul class="nav sidebar-nav">
                <li>
                    <button type="button" id="button-welcome" data-section="welcome" class="nav-button" data-toggle="tooltip" title="Home">
                        <div class="fa fa-fw fa-home" onclick="document.getElementById('button-welcome').click()"></div>
                    </button>
                </li>
                <li>
                    <!-- TODO Is this the correct tooltip -->
                    <button type="button" id="button-characters" data-section="character" class="nav-button" data-toggle="tooltip" title="Characters">
                        <div class="fa fa-fw fa-file" onclick="document.getElementById('button-characters').click()"></div>
                    </button>
                </li>
                <li>
                    <!-- TODO Is this the correct tooltip / icon -->
                    <button type="button" id="button-cities" data-section="cities" class="nav-button" data-toggle="tooltip" title="Cities and Towns">
                        <div class="fa fa-fw fa-building" onclick="document.getElementById('button-cities').click()"></div>
                    </button>
                </li>
                <li>
                    <!-- TODO Is this the correct tooltip -->
                    <button type="button" id="button-world-maps" data-section="world-maps" class="nav-button" data-toggle="tooltip" title="World Maps">
                        <div class="fa fa-fw fa-map" onclick="document.getElementById('button-world-maps').click()"></div>
                    </button>
                </li>
                <li>
                    <!-- TODO Is this the correct tooltip -->
                    <button type="button" id="button-campaign" data-section="campaign" class="nav-button" data-toggle="tooltip" title="Campaign">
                        <div class="fa fa-fw fa-globe" onclick="document.getElementById('button-campaign').click()"></div>
                    </button>
                </li>
                <li>
                    <!-- TODO Is this the correct tooltip -->
                    <button type="button" id="button-settings" data-section="settings" class="nav-button" data-toggle="tooltip" title="Settings">
                        <div class="fa fa-fw fa-cog" onclick="document.getElementById('button-settings').click()"></div>
                    </button>
                </li>
            </ul>
        </nav>

        <main id="main-content-wrapper" class="content js-content"></main>
        <!-- end main-content-wrapper -->
    </div>
    <!-- end wrapper -->

    <footer>
        <div class="container">
            <p>
                We are using OpenRPG
                <script>
                    document.write(pkginfo.version)
                </script>, node
                <script>
                    document.write(process.versions.node)
                </script>, Chrome
                <script>
                    document.write(process.versions.chrome)
                </script>, and Electron
                <script>
                    document.write(process.versions.electron)
                </script>.
            </p>
        </div>
    </footer>

    <script>
        require('./js/imports')
        require('./js/nav')
    </script>

</body>

</html>
*/
