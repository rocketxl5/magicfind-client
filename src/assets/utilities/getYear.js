const getYear = (string) => {
    console.log(string)
    return parseInt(string.split('-')[0]);
}

export default getYear;