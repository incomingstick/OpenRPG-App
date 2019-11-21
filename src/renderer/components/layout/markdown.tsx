import React from 'react';
import MarkdownLoader from 'markdown-it';

require('highlight.js');

type TMarkdownProps = {
    content: any;
};

export default class Markdown extends React.Component<TMarkdownProps, any> {
    private md = new MarkdownLoader();

    public constructor(props: TMarkdownProps, context?: any) {
        super(props, context);
    }

    public render() {
        return (
            <div className='markdown hljs' dangerouslySetInnerHTML={{ __html: this.md.render(this.props.content) }} />
        );
    }
}
