import React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faBuilding, faMap, faGlobe } from '@fortawesome/free-solid-svg-icons';
import log from '../../../common/log';

require('../../scss/sidebar.scss');

type SidebarProps = {
    clickCallback: (callbackData: string) => void;
    screen?: string;
};

type SidebarState = {
    screen: string;
};

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {
    public constructor(props: SidebarProps, context?: SidebarState) {
        super(props, context);
        this.state = {
            screen: this.props.screen !== undefined ? this.props.screen : 'welcome'
        };
    }

    public render() {
        const activeItem = this.props.screen !== undefined ? this.props.screen : this.state.screen;

        return (
            <Menu fluid vertical tabular className='nav sidebar-nav'>
                <Menu.Item
                    id='button-welcome'
                    data-section='welcome'
                    className='nav-button'
                    title='Home'
                    name='welcome'
                    active={activeItem === 'welcome'}
                    onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faHome} />
                </Menu.Item>
                {/* TODO Is this the correct tooltip */}
                <Menu.Item
                    id='button-characters'
                    data-section='character'
                    className='nav-button'
                    title='Characters'
                    name='characters'
                    active={activeItem === 'characters'}
                    onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faFile} />
                </Menu.Item>
                {/* TODO Is this the correct tooltip / icon */}
                <Menu.Item
                    id='button-cities'
                    data-section='cities'
                    className='nav-button'
                    title='Cities and Towns'
                    name='cities'
                    active={activeItem === 'cities'}
                    onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faBuilding} />
                </Menu.Item>
                {/* TODO Is this the correct tooltip */}
                <Menu.Item
                    id='button-world-maps'
                    data-section='world-maps'
                    className='nav-button'
                    title='World Maps'
                    name='world-maps'
                    active={activeItem === 'world-maps'}
                    onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faMap} />
                </Menu.Item>
                {/* TODO Is this the correct tooltip */}
                <Menu.Item
                    id='button-campaign'
                    data-section='campaign'
                    className='nav-button'
                    title='Campaign'
                    name='campaign'
                    active={activeItem === 'campaign'}
                    onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faGlobe} />
                </Menu.Item>
            </Menu>
        );
    }

    /**
     * @desc This private function handles the click event triggered from one of this SideBar Menu.Item's being clicked. It calles this
     * SideBar's clickCallback function, passing the name of the clicked Menu.Item. We set the screen state of this SideBar to that name.
     *
     * @param e A React.MouseEvent<HTMLAnchorElement, MouseEvent> that was triggered from the current click being handled
     * @param data MenuItemProps the properties of the MenuItem (Menu.Item) that was clicked
     */
    private handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => {
        e.preventDefault();

        if (data.name === undefined) {
            log.warn('[Sidebar] Menu.Item prop name is missing or undefined');
            return;
        }

        this.props.clickCallback(data.name);

        this.setState({ screen: data.name });
    };
}
