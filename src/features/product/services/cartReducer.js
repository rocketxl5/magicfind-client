export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                ...state,
                cartItems: action.payload.cartItems
            }
        case 'error':
            return {
                ...state,
                error: action.payload
            }
        case 'update-item':
            return {
                ...state,
                quantitySelected: action.payload.quantitySelected,
                total: action.payload.total
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
            break;
    }
}
