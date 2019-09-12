import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class SettingsScreen extends React.Component<any, any> {
  public render() {
    return (
      <Grid verticalAlign="middle" columns="2" centered container stretched>
        <Grid.Row stretched>
          <Grid.Column stretched textAlign="center">
            <Header inverted>These are some mighty cool settings.</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

{/* TODO(incomingstick): this is the previous settings page
    <template class="section-template">
    <section id="settings-section" class="section js-section">
        <div class="settings-header">
            <h1>Settings</h1>
            <h2>Your Settings</h2>
        </div>

        <div class="container">
            <h3>TODO settings stuff here</h3>
        </div>
    </section>
</template> */}
