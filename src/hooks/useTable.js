import { useState, useEffect } from 'react';
import useColorSymbols from './useColorSymbols';
import { setPrice } from '../features/product/services/setPrice';
import { capitalize } from '../assets/utilities/capitalize';
import data from '../data/SEARCH.json';

const useTable = () => {
    const [rows, setRows] = useState(null);
    const [table, setTable] = useState(null);
    const { colorIdentity, manaCost } = useColorSymbols(table?.product);

    useEffect(() => {
        if (table) {
            const { type, product } = table;
            const result = getRows(type, product)
            setRows(result)
        }
    }, [manaCost, colorIdentity, table]);


    const getRows = (type, product) => {
        switch (type) {
            case 'archive':
                return [
                    {
                        title: 'Edition: ',
                        value: product?.set_name
                    },
                    {
                        title: 'Year: ',
                        value: `${product?.released_at?.split('-')[0]}`
                    },
                    {
                        title: 'Finish: ',
                        value: product?.finish
                    },
                    {
                        title: 'Rarity: ',
                        value: capitalize(product.rarity)
                    },
                    {
                        title: 'Collector #: ',
                        value: product?.collector_number
                    },
                    {
                        title: 'Price (US): ',
                        value: `$${setPrice(product.prices, product.finish.toLowerCase())}`
                    },
                    product?.type_line ?
                        {
                            title: 'Type: ',
                            value:
                                !product?.type_line?.includes('—') ? (
                                    product?.type_line
                                ) : (
                                    product?.type_line?.split('—')[0]
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
                        value: product?.mana_cost.length ?
                            manaCost.map((color) => color)
                            : 'None',
                        classList: 'color-symbols'
                    },
                    {
                        title: !product?.artist.includes('&') ? 'Artist: ' : 'Artists: ',
                        value: product?.artist
                    },
                ]
            case 'catalog':
                return [
                    {
                        title: 'Set:',
                        value: product.set_name
                    },
                    {
                        title: 'Finish:',
                        value: data.product.finish[product.finish]
                    },
                    {
                        title: 'Condition:',
                        value: data.product.conditions[product.condition]
                    },
                    {
                        title: 'Language:',
                        value: data.product.languages[product.language]
                    },
                    {
                        title: 'Price:',
                        value: `$${product.price} `
                    },
                    {
                        title: 'Quantity:',
                        value: product.quantity
                    },
                    {
                        title: 'Comment:',
                        value: product.comment ? product.comment : 'None'
                    },
                ]

            default:
                break;
        }

    }

    return { rows, setTable }
}

export default useTable;
