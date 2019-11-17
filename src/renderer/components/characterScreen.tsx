import * as React from 'react';
import { Tab } from 'semantic-ui-react';
import CharacterSheet from './characters/characterSheet';

require('../scss/characterSheet.scss');

export default class CharacterScreen extends React.Component<any, any> {
    private panes = [
        {
            menuItem: 'Char 1',
            render: () => (
                <Tab.Pane>
                    <CharacterSheet />
                </Tab.Pane>
            )
        },
        { menuItem: 'Char 2', render: () => <Tab.Pane>TODO adding and removing chars</Tab.Pane> },
        { menuItem: 'Char 3', render: () => <Tab.Pane>TODO Handle multiple chars</Tab.Pane> }
    ];

    public constructor(props: any, context?: any) {
        super(props, context);
    }

    public render() {
        return (
            <div className='section-template'>
                <div id='character-section'>
                    <div className='character-header'>
                        <h1>Characters</h1>
                    </div>

                    <div className='container'>
                        <Tab panes={this.panes} />
                    </div>
                </div>
            </div>
        );
    }
}
