import setString from './setString';

const setSearchString = (searchTerm, cardName) => {



    if (cardName) {

        return `/cards/named?exact=${setString(cardName, '+')}`;
    }
    else {
        console.log(searchTerm)
        return `/cards/named?fuzzy=${setString(searchTerm, '+')}`;
    }

}


export default setSearchString;