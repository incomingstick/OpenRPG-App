import React from 'react';
import MarkdownLoader from 'markdown-it';

require('highlight.js');

type MarkdownProps = {
    content: any;
};

export default class Markdown extends React.Component<MarkdownProps, any> {
    private md = new MarkdownLoader();

    public constructor(props: MarkdownProps, context?: any) {
        super(props, context);
    }

    public render() {
        return (
            <div className='markdown hljs' dangerouslySetInnerHTML={{ __html: this.md.render(this.props.content) }} />
        );
    }
}
