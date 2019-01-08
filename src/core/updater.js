import rp from 'request-promise';
import { remote } from 'electron';

const {
    app: { getVersion }
} = remote;

export const currentVersion = getVersion();

export const getLatestVersionInfo = async () => {
    try {
        const releaseData = await rp.get({
            url: 'https://api.github.com/repos/assnctr/unfx-proxy-parser/releases/latest',
            json: true,
            timeout: 5000,
            headers: {
                'User-Agent': 'Unfx Version Lookup'
            }
        });

        const version = releaseData.tag_name.slice(1);

        return version > currentVersion ? { version, releaseData } : false;
    } catch (error) {
        return false;
    }
};
