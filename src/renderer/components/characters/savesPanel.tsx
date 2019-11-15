import React from 'react';
import SavesItem from './savesItem'
import { ScoreList } from './characterSheet';

type TSavesPanelProps = {
    scoreList: ScoreList;
};

export default class SavesPanel extends React.Component<TSavesPanelProps, any> {
    public constructor(props: TSavesPanelProps, context?: any) {
        super(props, context);
    }

    public render() {
        const items: any = [];

        for (const [index, item] of this.props.scoreList.entries()) {
            items.push(<SavesItem key={index} scoreName={item.scoreName} />);
        }

        return (
            <div className='saves list-section box'>
                <ul>
                    {items}
                </ul>
                <div className='label'>Saving Throws</div>
            </div>
        );
    }
}
