import React from 'react';
import { ScoreList } from './characterSheet';

type ScoreBarProps = {
    scoreList: ScoreList;
};

type ScoreItemProps = {
    scoreName: string;
    scoreID: string;
};

export default class ScoreBar extends React.Component<ScoreBarProps, any> {
    public static Item = class extends React.Component<ScoreItemProps, any> {
        public constructor(props: ScoreItemProps, context?: any) {
            super(props, context);
        }

        public render() {
            const scoreID = this.props.scoreID;
            const scoreName = this.props.scoreName;

            return (
                <li>
                    <div className='score'>
                        <label htmlFor={scoreName}>{scoreName}</label>
                        <input name={scoreID + 'Score'} placeholder='10' />
                    </div>
                    <div className='modifier'>
                        <input name={scoreID + 'Mod'} placeholder='+0' />
                    </div>
                </li>
            );
        }
    };

    public constructor(props: ScoreBarProps, context?: any) {
        super(props, context);
    }

    public render() {
        const items: any = [];

        for (const [index, item] of this.props.scoreList.entries()) {
            items.push(<ScoreBar.Item key={index} scoreID={item.scoreID} scoreName={item.scoreName} />);
        }

        return (
            <div className='scores'>
                <ul>{items}</ul>
            </div>
        );
    }
}
