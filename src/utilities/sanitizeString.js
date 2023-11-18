const sanitizeString = (string) => {
    // Format name to fit scryfall api's requisite (word+word)
    return string.trim().split(' ').join('+');
};


export default sanitizeString;