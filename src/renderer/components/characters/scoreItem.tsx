import React from 'react';

type TScoreItemProps = {
    scoreName: string;
    scoreID: string;
};

export default class ScoreItem extends React.Component<TScoreItemProps, any> {
    public constructor(props: TScoreItemProps, context?: any) {
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
}
