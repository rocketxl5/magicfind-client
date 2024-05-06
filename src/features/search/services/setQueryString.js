const setQueryString = (string, separator) => {
    const res = string.toLowerCase().replaceAll(/["/,]/g, '').replace('  ', ' ').split(' ').join(separator);
    console.log(res)
    return res
}

export default setQueryString;