export const uniq = array => [...new Set([...array])];

export const wait = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
