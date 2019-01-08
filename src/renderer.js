import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { Provider } from 'react-redux';
import store from './store/index';

const root = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        root
    );
};

render();
