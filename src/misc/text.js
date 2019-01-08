export const splitByKK = content => content.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const bytesToSize = bytes => {
    if (bytes == 0) return '0 B';

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};
