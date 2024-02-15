const capitalizeString = (string, isCrumb = false) => {

    function join(strings) {
        return strings.join(' ');
    }

    function capitalize(strings) {
        return strings.map(string => {
            return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
        })
    }

    // Split string and keep either hyphen white space or slash bar if not a crumb
    function split(str, bool) {
        return !bool ? str.split(/([- /])/) : str.split('-');
    }

    return join(capitalize(split(string, isCrumb)));
}

export default capitalizeString;