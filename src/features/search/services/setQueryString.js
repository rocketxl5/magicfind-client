const setQueryString = (string, separator) => {
    return string.toLowerCase().replaceAll(/["/,]/g, '').replace('  ', ' ').split(' ').join(separator);
}

export default setQueryString;