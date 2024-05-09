export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'update-input':
            return {
                ...state,
                cardNames: action.payload.cardNames,
                isActive: action.payload.isActive,
                searchInput: action.payload.searchInput,
                searchType: action.payload.searchType,
            }
        case 'update-value':
            return {
                ...state,
                inputValue: action.payload
            }
        case 'update-marker':
            return {
                ...state,
                marker: action.payload
            }
        // case 'update-cart':
        //     return {
        //         ...state,
        //         itemsCount: action.payload.itemsCount,
        //         subTotal: action.payload.subTotal
        //     }
        // case 'delete-item':
        //     return {
        //         ...state,
        //         cartItems: action.payload
        //     }
        default:
            return {
                ...state,
                // itemsCount: 0
            }
    }
}
