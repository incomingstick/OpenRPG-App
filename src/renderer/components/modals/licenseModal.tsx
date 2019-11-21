import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import Markdown from '../layout/markdown';
import LICENSE from '!!raw-loader!../../../../LICENSE.md';

require('../../scss/modal.scss');

type TLicenceModalProps = {
    closeCallback: () => void;
    open: boolean;
};

type TLicenceModalState = {
    licenseOpen: boolean;
};

export default class LicenseModal extends React.Component<TLicenceModalProps, TLicenceModalState> {
    public constructor(props: TLicenceModalProps, context?: TLicenceModalState) {
        super(props, context);
        this.state = {
            licenseOpen: false
        };
    }

    public render() {
        const isOpen = this.props.open;

        return (
            <Modal open={isOpen} onClose={this.closeLicense} closeIcon>
                <Modal.Header>License</Modal.Header>
                <Modal.Content scrolling>
                    <Markdown content={LICENSE} />
                </Modal.Content>
                <Modal.Actions>
                    <Button className='btn' labelPosition='right' content='Close' onClick={this.closeLicense} />
                </Modal.Actions>
            </Modal>
        );
    }

    private closeLicense = () => {
        this.props.closeCallback();
        this.setState({ licenseOpen: false });
    };
}
