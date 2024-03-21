export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'quantity':
            return {
                ...state,
                isLoading: true
            }
        case 'succes':
            return {
                ...state,
                isLoading: false
            }

        default:
            break;
    }
    return state;
}
