import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import Markdown from '../layout/markdown';
import CHANGELOG from '!!raw-loader!../../../../CHANGELOG.md';

require('../../scss/modal.scss');

type TChangelogModalProps = {
    closeCallback: () => void;
    open: boolean;
};

type TChangelogModalState = {
    changelogOpen: boolean;
};

export default class ChangelogModal extends React.Component<TChangelogModalProps, TChangelogModalState> {
    public constructor(props: TChangelogModalProps, context?: TChangelogModalState) {
        super(props, context);
        this.state = {
            changelogOpen: false
        };
    }

    public render() {
        const isOpen = this.props.open;

        return (
            <Modal open={isOpen} onClose={this.closeChagelog} closeIcon>
                <Modal.Header>Changelog</Modal.Header>
                <Modal.Content scrolling>
                    <Markdown content={CHANGELOG} />
                </Modal.Content>
                <Modal.Actions>
                    <Button className='btn' labelPosition='right' content='Close' onClick={this.closeChagelog} />
                </Modal.Actions>
            </Modal>
        );
    }

    private closeChagelog = () => {
        this.props.closeCallback();
        this.setState({ changelogOpen: false });
    };
}
