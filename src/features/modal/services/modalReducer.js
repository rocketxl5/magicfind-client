///////////////////////////////////////////////////////////////////////
//    Updates search input & prediction list @ SearchForm            //
//    Tracks mouse events & updates tracker position @ Autocomplete  //
///////////////////////////////////////////////////////////////////////
export const modalReducer = (state, action) => {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                open: action.payload
            }
        case 'set-type':
            return {
                ...state,
                type: action.payload,
            }
        case 'set-modal':
            return {
                ...state,
                set: action.payload
            }
        case 'set-uris':
            return {
                ...state,
                uris: action.payload
            }
        case 'set-content':
            return {
                ...state,
                content: action.payload
            }
        case 'clear-modal':
            return {
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}
