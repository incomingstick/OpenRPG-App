import React from 'react';
import { Modal, Button, List } from 'semantic-ui-react';
import { PACKAGE_VERSION, NODE_VERSION, CHROME_VERSION, ELECTRON_VERSION } from '../../../common/globals';

require('../../scss/modal.scss');

type TAboutModalProps = {
    closeCallback: () => void;
    open: boolean;
};

type TAboutModalState = {
    aboutOpen: boolean;
};

export default class AboutModal extends React.Component<TAboutModalProps, TAboutModalState> {
    public constructor(props: TAboutModalProps, context?: any) {
        super(props, context);
        this.state = {
            aboutOpen: false
        };
    }

    public render() {
        const isOpen = this.props.open;

        return (
            <Modal open={isOpen} onClose={this.closeAbout} closeIcon>
                <Modal.Header>About OpenRPG</Modal.Header>
                <Modal.Content>
                    <p>
                        OpenRPG is a project created out of years of passion for playing Dungeons and Dragons by RPG
                        veteran @incomingstick
                    </p>
                    <p>
                        A special thanks to all of our contributors that have provided their time and effort to make
                        OpenRPG better!
                    </p>
                    <List>
                        <List.Item>
                            <List.Header as='h3'>Technical Details</List.Header>
                        </List.Item>
                        <List.Item content={'OpenRPG Version: ' + PACKAGE_VERSION} />
                        <List.Item content={'Node Version: ' + NODE_VERSION} />
                        <List.Item content={'Chrome Version: ' + CHROME_VERSION} />
                        <List.Item content={'Electron Version: ' + ELECTRON_VERSION} />
                    </List>
                </Modal.Content>
                <Modal.Actions>
                    <Button className='btn' labelPosition='right' content='Close' onClick={this.closeAbout} />
                </Modal.Actions>
            </Modal>
        );
    }

    private closeAbout = () => {
        this.props.closeCallback();
        this.setState({ aboutOpen: false });
    };
}
