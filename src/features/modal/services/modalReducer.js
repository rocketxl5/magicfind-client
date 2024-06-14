export const modalReducer = (state, action) => {
    switch (action.type) {
        case 'open-modal':
            return {
                ...state,
                open: action.payload
            }
        case 'set-content':
            return {
                ...state,
                content: action.payload
            }
        case 'set-props':
            return {
                ...state,
                props: action.payload
            }
        case 'set-uris':
            return {
                ...state,
                uris: action.payload
            }
        default:
            return null;
    }
}
