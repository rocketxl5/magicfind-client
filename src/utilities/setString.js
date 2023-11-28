const setString = (string, separator) => {

    return string.toLowerCase().replaceAll(/["/,]/g, '').replace('  ', ' ').split(' ').join(separator);
}

export default setString;