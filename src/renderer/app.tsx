import * as React from 'react';
import { render } from 'react-dom';
import AppContainer from './components/appContainer';

require('semantic-ui-css/semantic.min.css');
require('./css/animate.min.css');
require('./scss/main.scss');

render(<AppContainer />, document.getElementById('app'));
