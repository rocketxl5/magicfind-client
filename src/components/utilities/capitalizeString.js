const capitalizeString = (string) => {
    // const string_array = string.trim().split(/[- ]/);

    return `${string.charAt(0).toUpperCase()}${string
        .substring(1)
        .toLowerCase()}`;
}



export default capitalizeString;