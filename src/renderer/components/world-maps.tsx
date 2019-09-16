import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class WorldMapsScreen extends React.Component<any, any> {
  public render() {
    return (
      <Grid verticalAlign='middle' columns='2' centered container stretched>
        <Grid.Row stretched>
          <Grid.Column stretched textAlign='center'>
            <Header inverted>These are some mighty cool maps.</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

{
  /* <template class="section-template">
    <section id="world-maps-section" class="section js-section">
        <div class="world-maps-header">
            <h1>World Maps</h1>
            <h2>Your World Maps</h2>
        </div>

        <div class="container">
            <h3>TODO world map generator and other world map stuff here</h3>
        </div>
    </section>
</template> */
}
