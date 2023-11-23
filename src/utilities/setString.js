const setString = (string, separator) => {

    return string.toLowerCase().replaceAll('/', '').replaceAll('"', '').replace('  ', ' ').split(' ').join(separator);;
}

export default setString;