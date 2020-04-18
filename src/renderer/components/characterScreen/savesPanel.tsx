import React from 'react';
import { ScoreList } from './characterSheet';

type SavesPanelProps = {
    scoreList: ScoreList;
};

type SavesItemProps = {
    scoreName: string;
};

export default class SavesPanel extends React.Component<SavesPanelProps, any> {
    public static Item = class extends React.Component<SavesItemProps, any> {
        public constructor(props: SavesItemProps, context?: any) {
            super(props, context);
        }

        public render() {
            const scoreName = this.props.scoreName;

            return (
                <li>
                    <label htmlFor={scoreName + '-save'}>{scoreName}</label>
                    <input name={scoreName + '-save'} placeholder='+0' type='text' />
                    <input name={scoreName + '-save-prof'} type='checkbox' />
                </li>
            );
        }
    };

    public constructor(props: SavesPanelProps, context?: any) {
        super(props, context);
    }

    public render() {
        const items: any = [];

        for (const [index, item] of this.props.scoreList.entries()) {
            items.push(<SavesPanel.Item key={index} scoreName={item.scoreName} />);
        }

        return (
            <div className='saves list-section box'>
                <ul>{items}</ul>
                <div className='label'>Saving Throws</div>
            </div>
        );
    }
}
