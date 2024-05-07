const setQueryString = (string, separator) => {
    console.log(string)
    return string.toLowerCase().replaceAll(/["/,]/g, '').replace('  ', ' ').split(' ').join(separator);
}

export default setQueryString;