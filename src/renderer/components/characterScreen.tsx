import * as React from 'react';
import { Tab, Button } from 'semantic-ui-react';
import CharacterSheet from './characters/characterSheet';

require('../scss/characterSheet.scss');

type TCharacterState = {
    currIndex: number;
};

export default class CharacterScreen extends React.Component<any, TCharacterState> {
    private panes = [
        {
            menuItem: 'Char 1',
            render: () => (
                <Tab.Pane>
                    <CharacterSheet />
                </Tab.Pane>
            )
        },
        { menuItem: 'Char 2', render: () => <Tab.Pane>TODO removing chars</Tab.Pane> },
        {
            menuItem: 'New',
            render: () => (
                <Tab.Pane>
                    <p>TODO Do Character creation stuff here. For now click the button below to add a menu item.</p>
                    <Button content='Add Char' onClick={this.createCharacterMenu} />
                </Tab.Pane>
            )
        }
    ];

    public constructor(props: any, context?: TCharacterState) {
        super(props, context);
        this.state = {
            currIndex: 0
        };
    }

    public render() {
        const activeIndex = this.state.currIndex;

        return (
            <div className='section-template'>
                <div id='character-section'>
                    <div id='character-header'>
                        <h1>Characters</h1>
                    </div>

                    <div className='container'>
                        <Tab panes={this.panes} defaultActiveIndex={activeIndex} />
                    </div>
                </div>
            </div>
        );
    }

    private createCharacterMenu = () => {
        const item = {
            menuItem: 'Char ' + this.panes.length,
            render: () => (
                <Tab.Pane>
                    <CharacterSheet />
                </Tab.Pane>
            )
        };

        const index = this.panes.length - 1;

        this.panes.splice(index, 0, item);

        this.setState({ currIndex: index });
    };
}
