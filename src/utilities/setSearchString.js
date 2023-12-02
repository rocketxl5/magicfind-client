import setQueryString from './setQueryString';

const setSearchString = (searchTerm, cardName) => {



    if (cardName) {

        return `/cards/named?exact=${setQueryString(cardName, '+')}`;
    }
    else {
        console.log(searchTerm)
        return `/cards/named?fuzzy=${setQueryString(searchTerm, '+')}`;
    }

}


export default setSearchString;