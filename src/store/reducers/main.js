import { initial } from '../../core/settings';
import { MAIN_CHANGE_OPTION, MAIN_TOGGLE_OPTION } from '../../constants/ActionTypes';

const main = (state = initial.main, action) => {
    switch (action.type) {
        case MAIN_CHANGE_OPTION:
            return {
                ...state,
                [action.target]: action.value
            };
        case MAIN_TOGGLE_OPTION:
            return {
                ...state,
                [action.target]: !state[action.target]
            };
        default:
            return state;
    }
};

export default main;
