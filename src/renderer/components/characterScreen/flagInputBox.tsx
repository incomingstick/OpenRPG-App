import React from 'react';

type FlagInputBoxProps = {
    label: string;
    className: string;
    placeholder?: string;
};

export default class FlagInputBox extends React.Component<FlagInputBoxProps, any> {
    public constructor(props: FlagInputBoxProps, context?: any) {
        super(props, context);
    }

    public render() {
        const label = this.props.label;
        const className = this.props.className;
        const placeholder = this.props.placeholder;

        return (
            <div className={className + ' box'}>
                <div className='label-container'>
                    <label htmlFor={className}>{label}</label>
                </div>
                <input name={className} placeholder={placeholder} />
            </div>
        );
    }
}
