import { RESULT_SHOW, RESULT_TOGGLE_COUNTRY, CLOSE } from '../../constants/ActionTypes';

const initial = {
    active: false,
    linksWithProxies: [],
    proxiesByCountries: []
};

const result = (state = initial, action) => {
    switch (action.type) {
        case RESULT_SHOW:
            return {
                active: true,
                linksWithProxies: action.linksWithProxies,
                proxiesByCountries: action.proxiesByCountries
            };
        case RESULT_TOGGLE_COUNTRY:
            if (action.all) {
                return {
                    ...state,
                    proxiesByCountries: state.proxiesByCountries.map(item => {
                        return {
                            ...item,
                            active: action.state
                        };
                    })
                };
            }

            return {
                ...state,
                proxiesByCountries: state.proxiesByCountries.map(item => {
                    if (item.code == action.code) {
                        return {
                            ...item,
                            active: action.state
                        };
                    }

                    return item;
                })
            };
        case CLOSE:
            return initial;
        default:
            return state;
    }
};

export default result;
