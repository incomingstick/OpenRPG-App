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
        const scoreMod = this.props.scoreID + 'Mod';
        const scoreID = this.props.scoreID + 'Score';
        const scoreName = this.props.scoreName;

        return (
            <li>
                <div className='score'>
                    <label htmlFor={scoreID}>{scoreName}</label>
                    <input name={scoreID} placeholder='10' />
                </div>
                <div className='modifier'>
                    <input name={scoreMod} placeholder='+0' />
                </div>
            </li>
        );
    }
}
