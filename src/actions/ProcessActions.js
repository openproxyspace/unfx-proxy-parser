import Links from '../core/links';
import Parser from '../core/parser';
import { uniq } from '../misc/other';
import { saveSettings } from '../core/settings';
import {
    PROCESS_START_CRAWLING,
    PROCESS_UPDATE_CRAWLING_LEVEL_STATUS,
    PROCESS_ADD_CRAWLING_LEVEL,
    PROCESS_START_PARSING,
    PROCESS_UPDATE_PARSING_STATUS
} from '../constants/ActionTypes';
import { showResults } from './ResultActions';

const normalizeUrls = urls => {
    const links = urls.match(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi);

    if (links == null) {
        throw new Error('No links found');
    }

    return links.map(url => (url.match(/http:\/\/|https:\/\//i) ? url : 'http://' + url));
};

export const start = () => async (dispatch, getState) => {
    try {
        const {
            main: { threads, retry, deep, external, level, input }
        } = getState();
        saveSettings({ main: { threads, retry, deep, external, level, input } });

        if (deep) {
            dispatch(startCrawling());
        }

        const normalizedLinks = uniq(normalizeUrls(input));
        const links = deep ? await new Links({ threads, retry, deep, external, level }, normalizedLinks) : normalizedLinks;

        dispatch(startParsing(links.length));

        const results = await new Parser({ threads, retry }, links);

        dispatch(showResults(results));
    } catch (error) {
        alert(error);
    }
};

export const startCrawling = () => ({
    type: PROCESS_START_CRAWLING
});

export const addCrawlLevel = (level, passed, all) => ({
    type: PROCESS_ADD_CRAWLING_LEVEL,
    level,
    passed,
    all
});

export const updateCrawlLevelStatus = (level, passed, found) => ({
    type: PROCESS_UPDATE_CRAWLING_LEVEL_STATUS,
    level,
    passed,
    found
});

export const startParsing = all => ({
    type: PROCESS_START_PARSING,
    all
});

export const updateParsingStatus = done => ({
    type: PROCESS_UPDATE_PARSING_STATUS,
    done
});
