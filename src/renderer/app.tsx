import * as React from 'react';
import { render } from 'react-dom';
import AppContainer from './components/appContainer';

require('semantic-ui-css/semantic.min.css');
require('./css/animate.min.css');
require('./scss/app.scss');

render(<AppContainer />, document.getElementById('app'));
