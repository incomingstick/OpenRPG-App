import React from 'react';
import SkillItem from './skillItem';
import { SkillsList } from './characterSheet';

type TSavesPanelProps = {
    skillList: SkillsList;
};

export default class SavesPanel extends React.Component<TSavesPanelProps, any> {
    public constructor(props: TSavesPanelProps, context?: any) {
        super(props, context);
    }

    public render() {
        const items: any = [];

        for (const [index, item] of this.props.skillList.entries()) {
            items.push(<SkillItem key={index} skillName={item.skillName} scoreID={item.scoreID} />);
        }

        return (
            <div className='skills list-section box'>
                <ul>{items}</ul>
                <div className='label'>Skills</div>
            </div>
        );
    }
}
