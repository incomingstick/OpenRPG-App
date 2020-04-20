import React from 'react';
import { ScoreList } from './characterSheet';

type ScoreBarProps = {
    scoreList: ScoreList;
    data?: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };
};

type ScoreItemProps = {
    scoreName: string;
    scoreID: string;
    scoreVal: number;
};

export default class ScoreBar extends React.Component<ScoreBarProps, any> {
    public static Item = class extends React.Component<ScoreItemProps, any> {
        public constructor(props: ScoreItemProps, context?: any) {
            super(props, context);
        }

        public render() {
            const scoreID = this.props.scoreID;
            const scoreName = this.props.scoreName;
            const scoreVal = this.props.scoreVal;
            const scoreMod = Math.floor((scoreVal - 10) / 2);

            let scoreModStr = scoreMod.toString();
            if(scoreMod > 0) scoreModStr = '+' + scoreModStr;

            return (
                <li>
                    <div className='score'>
                        <label htmlFor={scoreName}>{scoreName}</label>
                        <input name={scoreID + 'Score'} placeholder={scoreVal.toString()} />
                    </div>
                    <div className='modifier'>
                        <input name={scoreID + 'Mod'} placeholder={scoreModStr} />
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
            let scoreVal: number | undefined = 0;

            switch (item.scoreID) {
                case 'STR': {
                    scoreVal = this.props.data?.str;
                    break;
                }

                case 'DEX': {
                    scoreVal = this.props.data?.dex;
                    break;
                }

                case 'CON': {
                    scoreVal = this.props.data?.con;
                    break;
                }

                case 'INT': {
                    scoreVal = this.props.data?.int;
                    break;
                }

                case 'WIS': {
                    scoreVal = this.props.data?.wis;
                    break;
                }

                case 'CHA': {
                    scoreVal = this.props.data?.str;
                    break;
                }

                default: {
                    scoreVal = 10;
                }
            }

            if (scoreVal === undefined || scoreVal === 0) scoreVal = 10;

            items.push(
                <ScoreBar.Item key={index} scoreID={item.scoreID} scoreName={item.scoreName} scoreVal={scoreVal} />
            );
        }

        return (
            <div className='scores'>
                <ul>{items}</ul>
            </div>
        );
    }
}
