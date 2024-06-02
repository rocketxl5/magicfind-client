export const deckItemReducer = (state, action) => {
    switch (action.type) {
        case 'set-name':
            return {
                ...state,
                name: action.payload,
            }
        case 'set-format':
            return {
                ...state,
                format: action.payload,
            }
        case 'set-status':
            return {
                ...state,
                public: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
