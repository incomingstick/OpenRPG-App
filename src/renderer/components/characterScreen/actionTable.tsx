import React from 'react';

// TODO integrate with OpenRPG libs
type ActionTableProps = {
    length: number;
};

export default class ActionTable extends React.Component<ActionTableProps, any> {
    public constructor(props: ActionTableProps, context?: any) {
        super(props, context);
    }

    public render = () => (
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

    public createTable = (count: number) => {
        const actionTable = [];

        for (let i = 0; i < count; i++) {
            const id = Math.random()
                .toString(36)
                .replace('0.', '');

            actionTable.push(
                <tr key={id}>
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
