import * as React from 'react';
import { Tab, Button, Menu, TabProps, SemanticShorthandItem, TabPaneProps } from 'semantic-ui-react';
import CharacterSheet from './characterScreen/characterSheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

require('../scss/characterSheet.scss');

export type CharacterSaveState = {
    currIndex?: string | number;
    characters: string[];
};

export type CharacterProps = {
    characterScreenSaveState: CharacterSaveState;
    characterScreenSaveCallback: (state: CharacterSaveState) => void;
};

export type CharacterState = {
    currIndex?: string | number;
    panes: PaneItem[];
};

type PaneItem = {
    pane?: SemanticShorthandItem<TabPaneProps>;
    menuItem?: JSX.Element;
    render?: () => React.ReactNode;
};

export default class CharacterScreen extends React.Component<CharacterProps, CharacterState> {
    private currKey: number;
    private currPanes: PaneItem[];

    // TODO(incomingstick): research maintaining state after unmount, this HAS to be possible...
    public constructor(props: CharacterProps, context?: CharacterState) {
        super(props, context);
        this.currKey = 0;
        this.state = {
            currIndex: 0,
            panes: [
                {
                    menuItem: <Menu.Item key={this.currKey++} name='Add' onClick={this.createCharacterMenu} />,
                    render: () => (
                        <Tab.Pane>
                            <p>
                                TODO Do Character creation stuff here. For now click the button below to add a menu
                                item.
                            </p>
                            <Button className='btn' content='Add Char' onClick={this.createCharacterMenu} />
                        </Tab.Pane>
                    )
                }
            ]
        };

        this.currPanes = this.state.panes;

        if (this.props.characterScreenSaveState !== undefined) this.loadSavedState(this.props.characterScreenSaveState);
    }

    public loadSavedState = (loadState: CharacterSaveState) => {
        const addPanes = this.currPanes;

        if (loadState?.characters !== undefined) {
            for (const name of loadState.characters) {
                // Add item to the end of the list - 1 to account for the 'Add' button
                addPanes.splice(this.state.panes.length - 1, 0, {
                    menuItem: (
                        <Menu.Item key={this.currKey++} id={name} onContextMenu={this.handleTabRightClick}>
                            {name}
                            <FontAwesomeIcon icon={faTimes} onClick={this.handleTabIconClick} />
                        </Menu.Item>
                    ),
                    render: () => (
                        <Tab.Pane>
                            <CharacterSheet />
                        </Tab.Pane>
                    )
                });
            }
        }

        this.currPanes = addPanes;
        this.state = {
            currIndex: loadState?.currIndex,
            panes: addPanes
        };
    };

    public save = () => {
        const retList: string[] = [];

        /**
         * TODO Currently we just retrieve the names of the character panes
         * eventually we will want to save the location of the character files
         */
        for (const pane of this.currPanes) {
            if (pane.menuItem?.props.id !== undefined) {
                retList.push(pane.menuItem?.props.id);
            }
        }

        if (this.props.characterScreenSaveCallback !== undefined)
            this.props.characterScreenSaveCallback({
                currIndex: this.state.currIndex,
                characters: retList
            });
    };

    public render() {
        const activeIndex = this.state.currIndex;

        return (
            <div className='section-template'>
                <div id='character-section'>
                    <div className='container'>
                        <Tab
                            id='character-tabs'
                            panes={this.currPanes}
                            activeIndex={activeIndex}
                            onTabChange={this.handleTabChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    public componentDidUpdate = () => {
        this.save();
    };

    public componentWillUnmount = () => {
        this.save();
    };

    public createCharacterMenu = () => {
        const index = this.state.panes.length - 1;
        const itemName = 'Char ' + this.currKey++;
        const item = {
            menuItem: (
                <Menu.Item key={this.currKey} id={itemName} onContextMenu={this.handleTabRightClick}>
                    {itemName}
                    <FontAwesomeIcon icon={faTimes} onClick={this.handleTabIconClick} />
                </Menu.Item>
            ),
            render: () => (
                <Tab.Pane>
                    <CharacterSheet />
                </Tab.Pane>
            )
        };

        const addPanes = this.state.panes;

        addPanes.splice(index, 0, item);

        this.setState({
            currIndex: index,
            panes: addPanes
        });
    };

    private handleTabIconClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        const id = event.currentTarget.parentElement?.id;
        const removeIndex = this.state.panes.findIndex((item: PaneItem) => item.menuItem?.props.id === id);
        const currIndex = this.state.currIndex as number;

        this.removePaneItem(event.currentTarget.parentElement?.id, removeIndex, currIndex);
    };

    // TODO(incomingstick): this function is not intended to delete the item (that should be a middle click), but for now this is what I am going to do
    // TODO(incomingstick): render a right click (context) menu
    private handleTabRightClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        const id = event.currentTarget?.id;
        const removeIndex = this.state.panes.findIndex((item: PaneItem) => item.menuItem?.props.id === id);
        const currIndex = this.state.currIndex as number;

        this.removePaneItem(id, removeIndex, currIndex);
    };

    private handleTabChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: TabProps) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ currIndex: data.activeIndex });
    };

    private removePaneItem = (id: string | undefined, removeIndex: any, currIndex: number) => {
        if (id === undefined) return;

        let nextIndex = 0;
        const addPanes = this.state.panes;

        addPanes.splice(removeIndex, 1);

        if (currIndex > removeIndex) {
            nextIndex = currIndex - 1;
        } else if (removeIndex === addPanes.length - 1 && removeIndex === currIndex && removeIndex > 0) {
            nextIndex = --removeIndex;
        } else {
            nextIndex = currIndex;
        }

        this.setState({ currIndex: nextIndex, panes: addPanes });
    };
}
