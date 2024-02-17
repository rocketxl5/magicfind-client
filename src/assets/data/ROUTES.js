const ROUTES = {
    authRoutes: [
        {
            name: 'Home',
            to: '../me',
        },
        {
            name: 'Dashboard',
            to: '../me/dashboard',
        },
        {
            name: 'Collection',
            to: '../me/collection'
        },
        {
            name: 'Store',
            to: '../me/store'
        },
        {
            name: 'Archive',
            to: '../me/archive'
        },
        {
            name: 'Profile',
            to: '/me/profile'
        },
        {
            name: 'Settings',
            to: '/me/settings'
        },
    ],

    routes: [
        {
            name: 'Home',
            to: '/'
        },
        {
            name: 'About',
            to: '../about'
        },
        {
            name: 'Contact',
            to: '../contact'
        },
        {
            name: 'Sing in',
            to: 'login'
        },
        {
            name: 'Crate Account',
            to: 'signup'
        },
    ]
}

export default ROUTES;