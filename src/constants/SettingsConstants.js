import path from 'path';

export const SETTINGS_FILE_NAME = 'settings.unfx.parser.json';
export const SETTINGS_FILE_PATH = process.env.PORTABLE_EXECUTABLE_DIR ? path.resolve(process.env.PORTABLE_EXECUTABLE_DIR, SETTINGS_FILE_NAME) : SETTINGS_FILE_NAME;

export const DEFAULT_MAIN_SETTINGS = {
    threads: 350,
    external: false,
    retry: false,
    deep: true,
    level: 2,
    input: ''
};

export const MERGED_DEFAULT_SETTINGS = {
    main: DEFAULT_MAIN_SETTINGS
};
