export const slideShowReducer = (state, action) => {
    switch (action.type) {
        case 'set-coordinate':
            return {
                ...state,
                coordinate: action.payload
            }
        case 'set-indicator':
            return {
                ...state,
                indicator: action.payload
            }
        case 'internal':
            return {
                ...state,
                content: action.payload
            }
        case 'minimal-limit':
            return {
                ...state,
                props: action.payload
            }
        case 'maximal-limit':
            return {
                ...state,
                contentType: action.payload
            }
        default:
            return null;
    }
}
