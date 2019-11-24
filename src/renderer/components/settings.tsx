import * as React from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';
import { TSettingsData } from '../../common/services/settingsService';
import { ipcRenderer } from 'electron';
import log from '../../common/log';

type TSettingsScreenState = {
    settings: TSettingsData;
};

type TSettingsScreenProps = {
    settingsScreenSaveCallback: () => void;
};

export default class SettingsScreen extends React.Component<TSettingsScreenProps, TSettingsScreenState> {
    public constructor(props: TSettingsScreenProps, context?: TSettingsScreenState) {
        super(props, context);

        this.state = {
            settings: ipcRenderer.sendSync('sync-settings-get') as TSettingsData
        };
    }

    public render() {
        return (
            <div className='section-template'>
                <div id='settings-section'>
                    <div className='settings-header'>
                        <h1>Settings</h1>
                    </div>

                    <div className='container'>
                        <h4>Zoom Level</h4>
                        {/**
                          * TODO(incomingstick):
                          *     - Add ability to zoom out.
                          *     - Add ability to Ctrl+Scroll zoom.
                          *     - Add ability to enter decimals.
                          *     - Add up/down arrows in input and allow up/down key use
                          */}
                        <p>
                            Adjust the zoom level of the window. The original size is 0 and each increment above (e.g.
                            1) represents zooming 20% larger.
                        </p>
                        <Input
                            value={this.state.settings.zoomLevel !== undefined ? this.state.settings.zoomLevel : 0}
                            onChange={this.handleNumberInput}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        const re = /^[0-9\b]+$/;

        // If value is not blank, then test the regex

        if (data.value === '' || re.test(data.value)) {
            log.info('[Settings Menu] ', data.value);

            ipcRenderer.send('settings-updated', { zoomLevel: data.value });
            this.setState({ settings: ipcRenderer.sendSync('sync-settings-get') as TSettingsData });
        }

        this.props.settingsScreenSaveCallback();
    };
}
