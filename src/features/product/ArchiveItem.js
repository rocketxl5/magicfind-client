import { useState, useEffect, useReducer } from 'react';
import Loader from '../../layout/Loader';
import Button from '../../components/Button';
import Card from '../../components/Card';
import TwoSidedSlide from '../modal/components/TwoSidedSlide';
import Image from '../../components/Image';
import useExpandImage from '../../hooks/useExpandImage';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import useFind from '../../hooks/useFind';
import useColorSymbols from '../../hooks/useColorSymbols';
import setProductName from './services/setProductName';
import { api } from '../../api/resources';
import trimProduct from './services/trimProduct';
import { IoExpand } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import data from '../../data/SEARCH.json';

const initialState = {
    isSet: false,
    isCollection: false,
    isCatalog: false
}

const ArchiveItem = ({ index, product, count, handleSlideView }) => {
    const [loading, setLoading] = useState(false);
    const [isCardAdded, setIsCardAdded] = useState(false);
    const { auth } = useAuth();
    const { user, token } = auth;
    const {
        artist,
        collector_number,
        finishes,
        prices,
        rarity,
        released_at,
        set_name,
        type_line,
    } = product;
    const { fetch, patch, post, response, error } = useAxios();
    const { colorIdentity, manaCost } = useColorSymbols(product);
    const { setUpdateCollection } = useSearch();
    const { expandedImage } = useExpandImage(product);
    const { findMatch, isMatchFound } = useFind();

    // Removes product name redundencies ex: Adrix and Nev, Twincasters reversible edition

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

    const details = [
        {
            title: 'Edition: ',
            value: set_name
        },
        {
            title: 'Year: ',
            value: `${released_at?.split('-')[0]}`
        },
        {
            title: 'Finish: ',
            value: data.product.finishes[finishes]
        },
        {
            title: 'Rarity: ',
            value: `${rarity.charAt(0).toUpperCase()}${rarity.substring(1)}`
        },
        {
            title: 'Collector #: ',
            value: collector_number
        },
        {
            title: 'Price (US): ',
            value: `$${setPrice(prices, finishes[0])}`
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
    ];

    useEffect(() => {
        findMatch(product);
    }, []);


    const handleClick = (e) => {
        const query = `${api.serverURL}/api/catalog/product/id/${product.id}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }
        setLoading(true);

        fetch(query, config);
    }

    const handleCatalogResponse = (response, product) => {
        const { isSet } = response;
        // If product does not exist
        if (!isSet) {
            // Add it to site cards library
            post(
                auth.token,
                '/api/cards/add/product',
                trimProduct(product, 'cards')
            );
        }
        else {
            // Add it to current user's collection
            patch(
                auth.token,
                `api/users/${user.id}/add/card`,
                trimProduct(product, 'users')
            );
        }
    }
    const handleCardsResponse = (response) => {
        const { product, isSet } = response;

        if (isSet) {
            patch(
                auth.token,
                `api/users/${user.id}/add/card`,
                trimProduct(product, 'users')
            );
        }
    }
    const handleUsersResponse = (response) => {
        const { isSet } = response;

        if (isSet) {
            patch(
                auth.token,
                `api/cards/modify/${product.id}`,
                auth.user
            );
        }
    }

    const handleUpdate = (response) => {
        const { isSet } = response;

        if (isSet) {
            setLoading(false);
            setIsCardAdded(true);
            setUpdateCollection(true);
        }
    }

    useEffect(() => {
        if (response) {
            switch (response.origin) {
                case 'catalog':
                    handleCatalogResponse(response, product)
                    break;
                case 'cards':
                    handleCardsResponse(response)
                    break;
                case 'users':
                    handleUsersResponse(response)
                    break;
                default:
                    handleUpdate(response)
            }
        }
    }, [response, product]);

    useEffect(() => {
        if (error) {
            setLoading(false);
            console.log(error);
        }
    }, [error])

    return (
        <Card classList={"product-container"}>
            <TwoSidedSlide classList={
                {
                    container: '',
                    btn: 'card-action-btn b-radius-5 btn-bottom-right color-light'
                }
            }>
                <Image
                    product={product}
                    classList='product-image'
                >
                    {
                        (product.finishes[0] === 'foil') &&
                        <div className="product-finish">
                            <span className='foil'>{data.product.finishes[product.finishes]}</span>
                        </div>
                    }
                    <Button
                        id={'expand-image'}
                        classList={'product-btn absolute btn-center-right box-size-8 border-light-2 color-light bg-alpha b-radius-5'}
                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                    >
                        <IoExpand className='expand-icon' />
                    </Button>
                    {
                        loading ?
                            <Button classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right b-radius-5'} >
                                <Loader classList={'relative color-light bg-alpha'} />
                            </Button>
                            :
                            (isCardAdded || isMatchFound) ?
                                <Button classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right disabled b-radius-5'} disabled={true}>
                                    <FaCheck />
                                </Button>
                                :
                                <Button classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right b-radius-5'}
                                    handleClick={handleClick}>
                                    <FaPlus />
                                </Button>
                    }
                </Image>
                <div className='product-details'>
                    <section>
                        <div>
                            <h2 className='text-center fs-150 fw-500'>Card Info</h2>
                        </div>
                        <div className='b-radius-5 border-surface-thin'>
                            <table>
                                <tbody>
                                    {
                                        details &&
                                        details.map((detail, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='spec-title col-3'>{detail.title}</td>
                                                    <td className={`spec-value col-8 ${detail.classList ? detail.classList : ''}`}>{detail.value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section>
                    </section>
                </div>
            </TwoSidedSlide>
            <span className='product-count'>{index + 1} of {count}</span>
            <div className="col-12 relative flex column justify-center align-center gap-1">
                <div>
                    {
                        !product.name.includes('//') ? product.name : setProductName(product).name
                    }
                </div>

                <div>
                    {
                        product.set_name
                    }
                </div>

            </div>
        </Card>
    )
}

export default ArchiveItem
