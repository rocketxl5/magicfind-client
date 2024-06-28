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
                displayMenu: action.payload.displayMenu,
                openHamburger: action.payload.openHamburger
            }
        case 'auth-menu':
            return {
                ...state,
                displayMenu: action.payload
            }
        case 'searchbar':
            return {
                ...state,
                openHamburger: action.payload.openHamburger,
                displaySearchBar: action.payload.displaySearchBar,
            }
        default:
            return {
                ...state
            }
    }
}