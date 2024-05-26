import { useState, useEffect } from 'react';
import useColorSymbols from './useColorSymbols';
import setPrice from '../assets/utilities/setPrice';
import data from '../data/ROUTES.json';

const useField = (product, type) => {
    const [fields, setFields] = useState(null);
    const [fieldType, setFieldType] = useState(null);
    const { colorIdentity, manaCost } = useColorSymbols(product);

    const data = {
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
                product.type_line ?
                    {
                        title: 'Type: ',
                        value:
                            !product.type_line?.includes('—') ? (
                                product.type_line
                            ) : (
                                product.type_line?.split('—')[0]
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
                    value: product.manaCost.length ?
                        manaCost.map((color) => color)
                        : 'None',
                    classList: 'color-symbols'
                },
                {
                    title: !product.artist.includes('&') ? 'Artist: ' : 'Artists: ',
                    value: product.artist
                },
            ],
    }

    return (fields, setFieldType)
}

export default useField
