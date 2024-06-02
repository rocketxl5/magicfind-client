export const storeItemReducer = (state, action) => {

    switch (action.type) {
        case 'set-form':
            return {
                state: action.payload
            }
        case 'new-product':
            return {
                ...state,
                ref: action.payload.ref,
                catalogId: action.payload.catalogId,
                isNewProduct: action.payload.isNewProduct

            }
        case 'name':
            return {
                ...state,
                name: action.payload,
            }
        case 'price':
            return {
                ...state,
                price: action.payload,
            }
        case 'quantity':
            return {
                ...state,
                quantity: action.payload,
            }
        case 'condition':
            return {
                ...state,
                condition: action.payload,
            }
        case 'language':
            return {
                ...state,
                language: action.payload,
            }
        case 'selection':
            return {
                ...state,
                selection: action.payload
            }
        case 'comment':
            return {
                ...state,
                comment: action.payload
            }
        case 'published':
            return {
                ...state,
                isPublished: action.payload
            }
        case 'submit':
            return {
                ...state,
                isSubmit: action.payload
            }
        case 'updated':
            return {
                ...state,
                isUpdated: action.payload
            }
        case 'valid':
            return {
                ...state,
                isValid: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
