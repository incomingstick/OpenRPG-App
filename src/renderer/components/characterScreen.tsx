import * as React from 'react';
import { Tab, Button, Menu, TabProps, SemanticShorthandItem, TabPaneProps } from 'semantic-ui-react';
import CharacterSheet from './characters/characterSheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

require('../scss/characterSheet.scss');

export type TCharacterSaveState = {
    names?: string[];
    currIndex?: number;
};

export type TCharacterProps = {
    characterScreenSaveState?: TCharacterSaveState;
    characterScreenSaveCallback?: (state: TCharacterSaveState) => void;
};

export type TCharacterState = {
    currIndex: string | number | undefined;
    panes: TPaneItem[];
};

type TPaneItem = {
    pane?: SemanticShorthandItem<TabPaneProps>;
    menuItem?: JSX.Element;
    render?: (() => React.ReactNode) | undefined;
};

export default class CharacterScreen extends React.Component<TCharacterProps, TCharacterState> {
    private currKey: number;
    private currPanes: TPaneItem[];

    // TODO(incomingstick): research maintaining state after unmount, this HAS to be possible...
    public constructor(props: TCharacterProps, context?: TCharacterState) {
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

        if (this.props.characterScreenSaveState !== undefined)
            this.loadCharacterState(this.props.characterScreenSaveState);
    }

    public loadCharacterState = (loadState: TCharacterSaveState) => {
        const addPanes = this.currPanes;

        if (loadState?.names !== undefined) {
            let item: TPaneItem;
            let name: string;

            for (name of loadState.names) {
                item = {
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
                };

                // Add item to the end of the list - 1 to account for the 'Add' button
                addPanes.splice(this.state.panes.length - 1, 0, item);
            }
        }

        if (loadState?.currIndex !== undefined && loadState.currIndex > this.currKey) {
            this.currKey = loadState?.currIndex;
        }

        this.currPanes = addPanes;
    };

    public getCharacterSaveData = () => {
        const retList: string[] = [];

        /**
         * Currently we just retrieve the names of the character panes
         * eventually we will want to save the location of the characters
         */
        for (const pane of this.currPanes) {
            if (pane.menuItem?.props.id !== undefined) {
                retList.push(pane.menuItem?.props.id);
            }
        }

        return {
            names: retList,
            currIndex: this.currKey
        };
    };

    public save = () => {
        if (this.props.characterScreenSaveCallback !== undefined)
            this.props.characterScreenSaveCallback(this.getCharacterSaveData());
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

        this.save();

        this.setState({ currIndex: index, panes: addPanes });
    };

    private handleTabIconClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();

        const id = e.currentTarget.parentElement?.id;
        const removeIndex = this.state.panes.findIndex((item: TPaneItem) => item.menuItem?.props.id === id);
        const currIndex = this.state.currIndex as number;

        this.removePaneItemFromClick(id, removeIndex, currIndex);
    };

    // TODO(incomingstick): this function is not intended to delete the item, but for now that is what I am going to do
    // TODO(incomingstick): render a right click menu
    private handleTabRightClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        const id = e.currentTarget?.id;
        const removeIndex = this.state.panes.findIndex((item: TPaneItem) => item.menuItem?.props.id === id);
        const currIndex = this.state.currIndex as number;

        this.removePaneItemFromClick(id, removeIndex, currIndex);
    };

    private handleTabChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: TabProps) => {
        const index = data.activeIndex;

        this.setState({ currIndex: index });
    };

    // FIXME(incomingstick): when returning to this page, React claims there is a memory leak when calling
    // SetState within this function... why?
    private removePaneItemFromClick = (id: string | undefined, removeIndex: any, currIndex: number) => {
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

        this.save();

        this.setState({ currIndex: nextIndex, panes: addPanes });
    };
}
