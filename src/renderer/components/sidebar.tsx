import React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faBuilding, faMap, faGlobe, faCog } from '@fortawesome/free-solid-svg-icons';

require('../scss/sidebar.scss');

type TSidebarProps = {
    clickCallback: (callbackData: string) => void;
};

type TSidebarState = {
    screen: string;
};

export default class Sidebar extends React.Component<TSidebarProps, TSidebarState> {
    public constructor(props: TSidebarProps, context?: TSidebarState) {
        super(props, context);
        this.state = {
            screen: 'welcome'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        const activeItem = this.state.screen;

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
                {/* <!-- TODO Is this the correct tooltip --> */}
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
                {/* <!-- TODO Is this the correct tooltip / icon --> */}
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
                {/* <!-- TODO Is this the correct tooltip --> */}
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
                {/* <!-- TODO Is this the correct tooltip --> */}
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
                {/* <!-- TODO Is this the correct tooltip --> */}
                <Menu.Item
                    id='button-settings'
                    data-section='settings'
                    className='nav-button'
                    title='Settings'
                    name='settings'
                    active={activeItem === 'settings'}
                    onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faCog} />
                </Menu.Item>
            </Menu>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => {
        e.preventDefault();

        if (data.name === undefined) {
            console.log('Menu.Item prop name is missing or undefined');
            return;
        }

        this.props.clickCallback(data.name);

        this.setState({ screen: data.name });
    };
}
