export const modalReducer = (state, action) => {
    switch (action.type) {
        case 'open-modal':
            return {
                ...state,
                open: true
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
        case 'set-modal':
            return {
                ...state,
                modal: action.payload
            }
        case 'set-images':
            return {
                ...state,
                images: action.payload
            }
        case 'set-layouts':
            return {
                ...state,
                layouts: action.payload
            }
        default:
            return null;
    }
}