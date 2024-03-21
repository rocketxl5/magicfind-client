export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                ...state,
                quantitySelected: action.payload.quantitySelected,
                cartItems: action.payload.cartItems
            }
        case 'error':
            return {
                ...state,
                error: action.payload
            }
        case 'set-item':
            return {
                ...state,
                index: action.payload.index,
                price: action.payload.price,
                quantitySelected: action.payload.quantitySelected,
                quantityAvailable: action.payload.quantityAvailable,
                total: action.payload.total,

            }
        case 'update-quantity':
            return {
                ...state,
                quantitySelected: action.payload
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
        case 'add-item':
            return {
                ...state,
                cartItems: action.payload
            }
        case 'total':
            return {
                ...state,
                price: action.payload.price,
                total: action.payload.total
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
