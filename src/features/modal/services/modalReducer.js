export const modalReducer = (state, action) => {
    switch (action.type) {
        case 'open-modal':
            return {
                ...state,
                open: action.payload
            }
        case 'close-modal':
            return {
                ...state,
                open: false,
                content: null,
                props: null
            }
        case 'clear-modal':
            return {
                ...action.payload
            }
        case 'set-content':
            return {
                ...state,
                content: action.payload
            }
        case 'set-uris':
            return {
                ...state,
                uris: action.payload
            }
        case 'set-image':
            return {
                ...state,
                images: action.payload
            }
        case 'set-layouts':
            return {
                ...state,
                layouts: action.payload
            }
        case 'set-props':
            return {
                ...state,
                props: action.payload
            }
        default:
            return null;
    }
}