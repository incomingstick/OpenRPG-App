import React from 'react';
import ScoreItem from './scoreItem';
import { ScoreList } from './characterSheet';

type TScoreBarProps = {
    scoreList: ScoreList;
};

export default class ScoreBar extends React.Component<TScoreBarProps, any> {
    public constructor(props: TScoreBarProps, context?: any) {
        super(props, context);
    }

    public render() {
        const items: any = [];

        for (const [index, item] of this.props.scoreList.entries()) {
            items.push(<ScoreItem key={index} scoreID={item.scoreID} scoreName={item.scoreName} />);
        }

        return (
            <div className='scores'>
                <ul>{items}</ul>
            </div>
        );
    }
}
