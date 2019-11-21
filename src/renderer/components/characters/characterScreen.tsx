import * as React from 'react';
import { Tab, Button, Menu, TabProps, SemanticShorthandItem, TabPaneProps } from 'semantic-ui-react';
import CharacterSheet from './characterSheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

require('../../scss/characterSheet.scss');

export type TCharacterSaveState = {
    names?: string[];
    currIndex?: number;
}

type TCharacterProps = {
    characterSaveState?: TCharacterSaveState;
    characterSaveCallback?: (state: TCharacterSaveState) => void;
}

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
                    menuItem: <Menu.Item key={this.currKey++} name='New' onClick={this.createCharacterMenu} />,
                    render: () => (
                        <Tab.Pane>
                            <p>
                                TODO Do Character creation stuff here. For now click the button below to add a menu
                                item.
                            </p>
                            <Button content='Add Char' onClick={this.createCharacterMenu} />
                        </Tab.Pane>
                    )
                }
            ]
        };

        this.currPanes = this.state.panes;
        
        if(this.props.characterSaveState !== undefined) this.loadCharacterState(this.props.characterSaveState);
    }

    public loadCharacterState = (loadState: TCharacterSaveState) => {
        const newPanes = this.currPanes;

        if(loadState?.names !== undefined) {
            let item: TPaneItem;
            let name: string;

            for(name of loadState.names) {
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

                // Add item to the end of the list - 1 to account for the New button
                newPanes.splice(this.state.panes.length - 1, 0, item);
            }
        }

        if(loadState?.currIndex !== undefined && loadState.currIndex > this.currKey) {
            this.currKey = loadState?.currIndex;
        }
        
        this.currPanes = newPanes;
    }

    public saveCharacterState = () => {
        let retList: string[] = [];
        let saveIndex = this.currKey;

        for(let pane of this.currPanes) {
            console.log(pane.menuItem?.props);
            if(pane.menuItem?.props.id !== undefined) {
                retList.push(pane.menuItem?.props.id);
            }
        }

        return {
            names: retList,
            currIndex: saveIndex
        };
    }

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
        if(this.props.characterSaveCallback !== undefined) this.props.characterSaveCallback(this.saveCharacterState());
    }

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
        const newPanes = this.state.panes;

        newPanes.splice(removeIndex, 1);

        if (currIndex > removeIndex) {
            nextIndex = currIndex - 1;
        } else if (removeIndex === newPanes.length - 1 && removeIndex === currIndex && removeIndex > 0) {
            nextIndex = --removeIndex;
        } else {
            nextIndex = currIndex;
        }

        this.setState({ currIndex: nextIndex, panes: newPanes });
    };

    private createCharacterMenu = () => {
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

        const newPanes = this.state.panes;

        newPanes.splice(index, 0, item);

        this.setState({ currIndex: index, panes: newPanes });
    };
}
