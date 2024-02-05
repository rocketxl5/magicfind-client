const SEARCH = {
    product: {
        languages: {
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            de: 'German',
            it: 'Italian',
            pt: 'Portugese',
            ja: 'Japanese',
            ko: 'Korean',
            ru: 'Russion',
            zhs: 'Simplified Chinese',
            zht: 'Traditional Chinese',
            ph: 'Phyrexian'
        },
        conditions: {
            m: 'Mint',
            nm: 'Near Mint',
            lp: 'Lightly Played',
            mp: 'Moderatly Played',
            hp: 'Heavily Played',
            d: 'Damaged'
        },
    },
    parameters: [
        "Price",
        "Condition",
        "Expansion",
        "Color",
        "Date",
        "Foil",
    ]
}

export default SEARCH