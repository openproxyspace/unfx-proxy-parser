import {
    PROCESS_START_CRAWLING,
    PROCESS_UPDATE_CRAWLING_LEVEL_STATUS,
    PROCESS_ADD_CRAWLING_LEVEL,
    PROCESS_START_PARSING,
    PROCESS_UPDATE_PARSING_STATUS,
    CLOSE
} from '../../constants/ActionTypes';

const initial = {
    active: false,
    stage: 0,
    crawling: [],
    parsing: {
        all: 0,
        done: 0
    }
};

const process = (state = initial, action) => {
    switch (action.type) {
        case PROCESS_START_CRAWLING:
            return {
                ...state,
                active: true,
                stage: 1
            };
        case PROCESS_START_PARSING:
            return {
                ...state,
                active: true,
                stage: 2,
                parsing: {
                    all: action.all,
                    done: 0
                }
            };
        case PROCESS_UPDATE_PARSING_STATUS:
            return {
                ...state,
                parsing: {
                    all: state.parsing.all,
                    done: action.done
                }
            };
        case PROCESS_ADD_CRAWLING_LEVEL:
            return {
                ...state,
                crawling: [
                    ...state.crawling,
                    {
                        level: action.level,
                        links: {
                            all: action.all,
                            passed: action.passed,
                            found: 0
                        }
                    }
                ]
            };
        case PROCESS_UPDATE_CRAWLING_LEVEL_STATUS:
            return {
                ...state,
                crawling: state.crawling.map(item => {
                    if (item.level == action.level) {
                        return {
                            ...item,
                            links: {
                                ...item.links,
                                passed: action.passed,
                                found: action.found
                            }
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

export default process;
