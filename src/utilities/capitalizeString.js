const capitalizeString = (string) => {

    function join(strings) {
        return strings.join('');
    }

    function capitalize(strings) {
        return strings.map(string => {
            return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
        })
    }

    // Split string and keep either hyphen white space or slash bar if any
    function split(string) {
        return string.split(/([- \/])/);
    }

    return join(capitalize(split(string)));
}

export default capitalizeString;