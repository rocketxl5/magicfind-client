import fields from './flieds';
import data from '../../../ROUTES.json';

const setFields = (product, type) => {
    // Sets card price according to card finish
    const setPrice = (prices, finish) => {
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
    const fields = {
        archive:
            [
                {
                    title: 'Edition: ',
                    value: product.set_name
                },
                {
                    title: 'Year: ',
                    value: `${product.released_at?.split('-')[0]}`
                },
                {
                    title: 'Finish: ',
                    value: data.product.finishes[product.finishes]
                },
                {
                    title: 'Rarity: ',
                    value: `${product.rarity.charAt(0).toUpperCase()}${product.rarity.substring(1)}`
                },
                {
                    title: 'Collector #: ',
                    value: product.collector_number
                },
                {
                    title: 'Price (US): ',
                    value: `$${setPrice(product.prices, product.finishes[0])}`
                },
                type_line ?
                    {
                        title: 'Type: ',
                        value:
                            !type_line?.includes('—') ? (
                                type_line
                            ) : (
                                type_line?.split('—')[0]
                            )
                    } : '',
                {
                    title: 'Identity: ',
                    value: colorIdentity.length ?
                        colorIdentity.map((color) => color)
                        : 'Colorless',
                    classList: 'color-symbols'
                },
                {
                    title: 'Cost: ',
                    value: manaCost.length ?
                        manaCost.map((color) => color)
                        : 'None',
                    classList: 'color-symbols'
                },
                {
                    title: !artist.includes('&') ? 'Artist: ' : 'Artists: ',
                    value: artist
                },
            ],
    }
    return fields[type]
}

export default setFields;