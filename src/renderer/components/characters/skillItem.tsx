import React from 'react';

type TScoreItemProps = {
    skillName: string;
    scoreID: string;
};

export default class SkillItem extends React.Component<TScoreItemProps, any> {
    public constructor(props: TScoreItemProps, context?: any) {
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
