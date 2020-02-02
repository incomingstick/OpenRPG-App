import React from 'react';

type ScoreItemProps = {
    scoreName: string;
    scoreID: string;
};

export default class ScoreItem extends React.Component<ScoreItemProps, any> {
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
}
