import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class CampaignScreen extends React.Component<any, any> {
  public render() {
    return (
      <Grid verticalAlign="middle" columns="2" centered container stretched>
        <Grid.Row stretched>
          <Grid.Column stretched textAlign="center">
            <Header inverted>These are some mighty cool campaigns.</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

{/* <template class="section-template">
    <section id="campaign-section" class="section js-section">
        <div class="campaign-header">
            <h1>Campaigns</h1>
            <h2>Your Campaigns</h2>
        </div>

        <div class="container">
            <h3>TODO campaign management stuff here</h3>
        </div>
    </section>
</template> */}
