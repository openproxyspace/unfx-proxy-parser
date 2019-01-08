import { MAIN_CHANGE_OPTION, MAIN_TOGGLE_OPTION } from '../constants/ActionTypes';

export const changeOption = e => ({
    type: MAIN_CHANGE_OPTION,
    target: e.target.name,
    value: e.target.value
});

export const toggleOption = e => ({
    type: MAIN_TOGGLE_OPTION,
    target: e.target.name
});
