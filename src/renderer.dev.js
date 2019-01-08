import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store/index';

const root = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Root />
            </Provider>
        </AppContainer>,
        root
    );
};

render();

if (module.hot) {
    module.hot.accept('./components/Root', render);
}
