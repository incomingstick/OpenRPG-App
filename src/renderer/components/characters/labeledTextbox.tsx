import React from 'react';

type TLabeledTextbox = {
    label: string;
    className: string;
    placeholder?: string;
};

export default class LabeledTextbox extends React.Component<TLabeledTextbox, any> {
    public constructor(props: TLabeledTextbox, context?: any) {
        super(props, context);
    }

    public render() {
        const label = this.props.label;
        const className = this.props.className;
        const placeholder = this.props.placeholder;

        return (
            <section className={'labeled-textbox ' + className}>
                <div>
                    <label htmlFor={className}>{label}</label>
                    <textarea name={className} placeholder={placeholder}></textarea>
                </div>
            </section>
        );
    }
}
