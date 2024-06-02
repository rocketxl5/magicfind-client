export const setPrice = (prices, finish) => {
    let price;
    switch (finish) {
        case 'foil':
            price = prices.usd_foil;
            break;

        case 'etched':
            price = prices.usd_etched;
            break;
        case 'nonfoil':
            price = prices.usd;
            break;
        default:
            price = null
    }

    return price ? price : 'Unavailable';
}