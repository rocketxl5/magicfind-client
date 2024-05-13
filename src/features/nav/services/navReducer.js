
export const navReducer = (state, action) => {
    switch (action.type) {
        case 'hamburger':
            return {
                ...state,
                openHamburger: action.payload
            }
        case 'menu':
            return {
                ...state,
                ...action.payload
            }
        case 'searchbar':
            return {
                ...state,
                openHamburger: action.payload,
                displaySearchBar: action.payload
            }
        // case 'hide-searchbar':
        //     return {
        //         ...state,
        //         displaySearchBar: action.payload,
        //         openHamburger: action.payload
        //     }
        default:
            return {
                ...state
            }
    }
}