const capitalizeWord = (word) => {

    return `${word.charAt(0).toUpperCase()}${word
        .substring(1)
        .toLowerCase()}`
}

export default capitalizeWord;