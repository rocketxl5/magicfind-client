export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'error':
            return {
                ...state,
                error: action.payload
            }
        case 'set-cart':
            return {
                ...state,
                cartItems: action.payload
            }
        case 'update-cart':
            return {
                ...state,
                itemsCount: action.payload.itemsCount,
                subTotal: action.payload.subTotal
            }
        case 'delete-item':
            return {
                ...state,
                cartItems: action.payload
            }
        default:
            return {
                ...state,
                itemsCount: 0
            }
    }
}
