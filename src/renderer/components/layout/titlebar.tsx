import React from 'react';
import { remote } from 'electron';
import ORPGLogo from '../../assets/images/d20_transparent.png';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faClone, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

require('../../scss/titlebar.scss');

/**
 * TODO(incomingstick):
 * - Add About Modal callback function
 * - Add menu hotkey/shortcuts
 * - Add the ability to filter menu items out based on build type (i.e hide some items for the release build)
 * - Allow mouse to hover across the bar when a single item has been clicked
 */

type TitlebarMenu = {
    itemLabel: string;
    itemCallback?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: DropdownItemProps) => any;
    submenu?: TitlebarMenu;
    divider?: boolean;
}[];

export default class TitleBar extends React.Component<any, any> {
    private titlebarMenu: TitlebarMenu = [
        {
            itemLabel: 'File',
            submenu: [
                {
                    itemLabel: 'Exit',
                    itemCallback: () => {
                        remote.getCurrentWindow().close();
                    }
                }
            ]
        },
        {
            itemLabel: 'Help',
            submenu: [
                {
                    itemLabel: 'Toggle Developers Tools',
                    itemCallback: () => {
                        const webContents = remote.getCurrentWindow().webContents;

                        if (webContents.isDevToolsOpened()) {
                            // Dev tools are open, close them!
                            webContents.closeDevTools();
                        } else {
                            // Open them there dev toolz
                            webContents.openDevTools();
                        }
                    },
                    divider: true
                },
                {
                    itemLabel: 'About'
                }
            ]
        }
    ];

    public render() {
        const win = remote.getCurrentWindow();

        return (
            <header id='titlebar'>
                <img src={ORPGLogo} className='logo' />
                <div id='titlebar-menu'>{this.buildMenu(this.titlebarMenu)}</div>
                <div id='window-title'>{win.getTitle()}</div>
                <div id='window-controls'>
                    <div className='button' id='min-button' onClick={this.handleWindowControlClick}>
                        <FontAwesomeIcon icon={faWindowMinimize} />
                    </div>
                    <div className='button' id='max-button' onClick={this.handleWindowControlClick}>
                        <FontAwesomeIcon icon={faSquare} />
                    </div>
                    <div className='button' id='restore-button' onClick={this.handleWindowControlClick}>
                        <FontAwesomeIcon icon={faClone} flip='both' />
                    </div>
                    <div className='button' id='close-button' onClick={this.handleWindowControlClick}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            </header>
        );
    }

    /**
     * @desc This function takes in a TitlebarMenu (currently defined only as this.titlebarMenu) and builds a
     * SemanticUI Dropdown Menu. To modify the contents of this menu, edit the private member variable titlebarMenu
     * above. This function is recursive.
     * 
     * @param input the current TitlebarMenu being passed. The root level is the the member variable titlebarMenu
     * 
     * @return a fully built SemanticUi Dropdown menu system as a JSX.Element
     */
    private buildMenu = (input: TitlebarMenu) => {
        const retElem: JSX.Element[] = [];
        let keyVal = 0;

        for (const item of input) {
            if (item.submenu !== undefined) {
                retElem.push(
                    <Dropdown key={keyVal++} className='titlebar-item' text={item.itemLabel} icon={null}>
                        <Dropdown.Menu>{this.buildMenu(item.submenu)}</Dropdown.Menu>
                    </Dropdown>
                );
            } else {
                retElem.push(<Dropdown.Item key={keyVal++} text={item.itemLabel} onClick={item.itemCallback} />);
            }

            if (item.divider) {
                retElem.push(<Dropdown.Divider key={keyVal++} />);
            }
        }

        return <>{retElem}</>;
    };

    /**
     * @desc This function handles the click event for the Window Control buttons located at the top right corner of our app.
     * Depending on which Window Control button was clicked, one of the 4 following things may occur:
     * - The app will minimize
     * - The app will fill the whole screen
     * - The app will restore to its previous state (🐞 see the FIXME below)
     * - The app will exit
     * 
     * FIXME(incomingstick): 3/4 of these buttons currently work, however the "restore" function is bugged. This seems to be an
     * Electron (or upstream) issue.
     */
    private handleWindowControlClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        const win = remote.getCurrentWindow();

        switch (e.currentTarget.id) {
            case 'min-button': {
                win.minimize();
                break;
            }

            case 'max-button': {
                win.maximize();
                document.body.classList.add('maximized');
                break;
            }

            case 'restore-button': {
                win.restore();
                document.body.classList.remove('maximized');
                break;
            }

            case 'close-button': {
                win.close();
                break;
            }

            default: {
                console.log('Unknown button click in title bar menu');
            }
        }
    };
}
