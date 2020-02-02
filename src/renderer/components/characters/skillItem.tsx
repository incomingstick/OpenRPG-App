import React from 'react';

type ScoreItemProps = {
    skillName: string;
    scoreID: string;
};

export default class SkillItem extends React.Component<ScoreItemProps, any> {
    public constructor(props: ScoreItemProps, context?: any) {
        super(props, context);
    }

    public render() {
        const scoreID = this.props.scoreID;
        const skillName = this.props.skillName;

        return (
            <li>
                <label htmlFor={skillName}>
                    {skillName}
                    <span className='skill'> ({scoreID})</span>
                </label>
                <input name={skillName} placeholder='+0' type='text' />
                <input name={skillName + 'Prof'} type='checkbox' />
            </li>
        );
    }
}
