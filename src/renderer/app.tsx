import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/appContainer';

// require('semantic-ui-css/semantic.min.css');
// require('./scss/main.scss');

// Create main element
const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        appElement
    );
};

// Check to ensure we don't render everything twice, as we are called in both render.js and app.js for some lame reason
const appExists = document.getElementById('app') ? true : false;
if (!appExists) {
    document.body.insertBefore(appElement, document.body.firstChild);
}

render(App);
