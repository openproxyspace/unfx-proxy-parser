import { lookup, codes } from '../core/country';
import { uniq } from '../misc/other';
import { sort } from 'js-flock';
import { writeFile } from 'fs';
import { remote } from 'electron';
import { RESULT_SHOW, CLOSE, RESULT_TOGGLE_COUNTRY } from '../constants/ActionTypes';

const { dialog } = remote;

export const showResults = results => dispatch => {
    const res = [];
    let countries = {};
    const proxies = uniq(results.proxies.flat());

    proxies.forEach(item => {
        const [ip] = item.split(':');
        const code = lookup(ip);

        if (countries[code] == undefined) {
            countries[code] = {
                code,
                ...codes[code],
                items: [item]
            };
        } else {
            countries[code].items.push(item);
        }
    });

    Object.keys(countries).forEach(item => {
        res.push({
            ...countries[item],
            active: true
        });
    });

    dispatch({
        type: RESULT_SHOW,
        linksWithProxies: results.linksWithProxies,
        proxiesByCountries: sort(res).desc(item => item.items.length)
    });
};

export const toggleCountry = (code, state, all) => ({
    type: RESULT_TOGGLE_COUNTRY,
    code,
    state,
    all
});

export const save = () => (dispatch, getState) => {
    let savePath = dialog.showSaveDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (savePath) {
        const {
            result: { proxiesByCountries }
        } = getState();

        const results = proxiesByCountries
            .filter(item => item.active)
            .map(item => item.items)
            .reduce((prev, curr) => [...prev, ...curr], []);

        writeFile(savePath, results.join('\r\n'), () => null);
    }
};

export const close = () => ({
    type: CLOSE
});
