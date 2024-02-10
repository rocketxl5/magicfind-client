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
        colors: {
            w: 'https://svgs.scryfall.io/card-symbols/W.svg',
            u: 'https://svgs.scryfall.io/card-symbols/U.svg',
            g: 'https://svgs.scryfall.io/card-symbols/G.svg',
            r: 'https://svgs.scryfall.io/card-symbols/R.svg',
            b: 'https://svgs.scryfall.io/card-symbols/B.svg',
        },
        symbologies: [
            'color_identity',
            'mana_cost'
        ]
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