export const mailReducer = (state, action) => {
    switch (action.type) {
        case 'inbox':
            return {
                ...state,
                inbox: action.payload
            }
        case 'unread':
            return {
                ...state,
                unread: action.payload
            }
        case 'sent':
            return {
                ...state,
                sent: action.payload
            }
        case 'trash':
            return {
                ...state,
                trash: action.payload
            }
        default:
            return null
    }
}
