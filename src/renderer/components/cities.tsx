import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class CitiesScreen extends React.Component<any, any> {
    public render() {
        return (
            <Grid verticalAlign='middle' columns='2' centered container stretched>
                <Grid.Row stretched>
                    <Grid.Column stretched textAlign='center'>
                        <Header inverted>These are some mighty cool cities.</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

{
    /* <template class="section-template">
    <section id="cities-section" class="section js-section">
        <div class="cities-header">
            <h1>Cities and Towns</h1>
            <h2>Your Cities and Towns</h2>
        </div>

        <div class="container">
            <h3>TODO city and town generator and other city/town stuff here</h3>
        </div>
    </section>
</template> */
}
