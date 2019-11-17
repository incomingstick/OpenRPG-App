import React from 'react';
import { remote } from 'electron';
import ORPGLogo from '../../assets/images/d20_transparent.png';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';

require('../../scss/titlebar.scss');

export default class TitleBar extends React.Component<any, any> {
    public render() {
        const win = remote.getCurrentWindow();

        return (
            <header id='titlebar'>
                <img src={ORPGLogo} className='logo' />
                <div id='titlebar-menu'>
                    {/* TODO Vertically center these */}
                    <Dropdown className='titlebar-item' text='File' icon={null}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Exit' onClick={this.handleMenuClick} />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='titlebar-item' text='Help' icon={null}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='About'></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div id='window-title'>
                    {/* TODO Window Title goes here */}
                    {win.getTitle()}
                </div>
                <div id='window-controls'>
                    <div className='button' id='min-button' onClick={this.handleWindowControlClick}>
                        <span>&#xE921;</span>
                    </div>
                    <div className='button' id='max-button' onClick={this.handleWindowControlClick}>
                        <span>&#xE922;</span>
                    </div>
                    <div className='button' id='restore-button' onClick={this.handleWindowControlClick}>
                        <span>&#xE923;</span>
                    </div>
                    <div className='button' id='close-button' onClick={this.handleWindowControlClick}>
                        <span>&#xE8BB;</span>
                    </div>
                </div>
            </header>
        );
    }

    private handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: DropdownItemProps) => {
        e.preventDefault();

        const win = remote.getCurrentWindow();

        switch (data.text) {
            case 'Exit': {
                win.close();
                break;
            }

            default: {
                console.log('Unknown button click in title bar menu');
            }
        }
    };

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
