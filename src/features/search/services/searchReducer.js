///////////////////////////////////////////////////////////////////////
//    Updates search input & prediction list @ SearchForm            //
//    Tracks mouse events & updates tracker position @ Autocomplete  //
///////////////////////////////////////////////////////////////////////
export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'clear-search':
            return {
                ...action.payload
            }
        case 'clear-preset':
            return {
                ...state,
                predictions: action.payload.predictions,
                searchTerm: action.payload.searchTerm
            }
        case 'search':
            return {
                ...state,
                searchTerm: action.payload.term,
                inputValue: action.payload.term,
                exact: action.payload.exact
            }
        case 'set-search':
            return {
                ...state,
                cardNames: action.payload.cardNames,
                searchType: action.payload.searchType,
            }
        case 'set-selection':
            return {
                ...state,
                selection: action.payload
            }
        case 'track-scroll':
            return {
                ...state,
                tracker: action.payload.tracker,
                position: action.payload.position,
            }
        case 'update-search':
            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}
