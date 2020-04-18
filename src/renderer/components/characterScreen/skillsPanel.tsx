import React from 'react';
import { SkillsList } from './characterSheet';

type SkillPanelProps = {
    skillList: SkillsList;
};

type ScoreItemProps = {
    skillName: string;
    scoreID: string;
};

export default class SkillsPanel extends React.Component<SkillPanelProps, any> {
    public static Item = class extends React.Component<ScoreItemProps, any> {
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
    };

    public constructor(props: SkillPanelProps, context?: any) {
        super(props, context);
    }

    public render() {
        const items: any = [];

        for (const [index, item] of this.props.skillList.entries()) {
            items.push(<SkillsPanel.Item key={index} skillName={item.skillName} scoreID={item.scoreID} />);
        }

        return (
            <div className='skills list-section box'>
                <ul>{items}</ul>
                <div className='label'>Skills</div>
            </div>
        );
    }
}
