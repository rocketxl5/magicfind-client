export const storeItemReducer = (state, action) => {
    switch (action.type) {
        case 'set-quantity':
            return {
                ...state,
                quantity: action.payload,
            }
        case 'set-price':
            return {
                ...state,
                price: action.payload,
            }
        case 'set-condition':
            return {
                ...state,
                condition: action.payload,
            }
        case 'set-language':
            return {
                ...state,
                language: action.payload,
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
