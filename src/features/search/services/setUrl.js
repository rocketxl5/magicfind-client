import setQueryString from './setQueryString';

export const setUrl = (path) => {
    // Catalog search
    const segments = path.substring(1).split('/');
    if (segments.length === 2) {
        const search = segments[0];
        const product = segments[1];
        return `/api/cards/${search}/${setQueryString(product, '-')}`;
    }
    // Collection search

    if (segments.length === 3) {
        const auth = segments[0];
        const search = segments[1];
        const product = segments[2];
        return `/api/cards/${auth}/${search}/${setQueryString(product, '-')}`;
    }
}
