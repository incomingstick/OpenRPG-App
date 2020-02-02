import React from 'react';

type SavesItemProps = {
    scoreName: string;
};

export default class SavesItem extends React.Component<SavesItemProps, any> {
    public constructor(props: SavesItemProps, context?: any) {
        super(props, context);
    }

    public render() {
        const scoreName = this.props.scoreName;

        return (
            <li>
                <label htmlFor={scoreName + '-save'}>{scoreName}</label>
                <input name={scoreName + '-save'} placeholder='+0' type='text' />
                <input name={scoreName + '-save-prof'} type='checkbox' />
            </li>
        );
    }
}
