import rootReducer from './reducers/';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default store;
