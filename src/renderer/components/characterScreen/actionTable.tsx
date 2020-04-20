import React from 'react';

// TODO integrate with OpenRPG libs
type ActionTableProps = {
    length: number;
};

export default class ActionTable extends React.Component<ActionTableProps, any> {
    public constructor(props: ActionTableProps, context?: any) {
        super(props, context);
    }

    public render = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attack Bonus</th>
                        <th>Damage/Type</th>
                    </tr>
                </thead>
                {this.createTable(this.props.length)}
            </table>
        );
    };

    public createTable = (count: number) => {
        let actionTable = [];

        // Outer loop to create parent
        for (let i = 0; i < count; i++) {
            actionTable.push(
                <tr>
                    <td>
                        <input className='action-name' type='text' />
                    </td>
                    <td>
                        <input className='action-bonus' type='text' />
                    </td>
                    <td>
                        <input className='action-damage' type='text' />
                    </td>
                </tr>
            );
        }

        return <tbody>{actionTable}</tbody>;
    };
}
