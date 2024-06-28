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
        case 'set-interval':
            return {
                ...state,
                interval: action.payload
            }
        case 'set-limit':
            return {
                ...state,
                min: action.payload
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
