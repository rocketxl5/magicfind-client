const setString = (string, separator) => {
    return string.toLowerCase().split(' ').filter(element => {
        return /^[a-zA-Z]+$/.test(element)
    }).join(separator);
}

export default setString;