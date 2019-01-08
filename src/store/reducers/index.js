import { combineReducers } from 'redux';
import main from './main';
import process from './process';
import result from './result';
import update from './update';

const rootReducer = combineReducers({
    main,
    process,
    result,
    update
});

export default rootReducer;
