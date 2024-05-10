///////////////////////////////////////////////////////////////////////
//    Updates search input & prediction list @ SearchForm            //
//    Tracks mouse events & updates tracker position @ Autocomplete  //
///////////////////////////////////////////////////////////////////////
export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'set-search':
            return {
                ...state,
                ...action.payload
            }
        case 'update-search':
            return {
                ...state,
                ...action.payload
            }
        case 'launch-search':
            return {
                ...state,
                searchTerm: action.payload
            }
        case 'track-scroll':
            return {
                ...state,
                tracker: action.payload.tracker,
                position: action.payload.position,
            }
        default:
            return {
                ...state,
                    error: 'Oups! Something went wrong'
                }
    }
}
