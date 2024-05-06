import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/Loader';
import Drop from '../../components/Drop';
import Card from '../../components/Card';
import TwoSidedSlide from '../modal/TwoSidedSlide';
import ImageNew from '../../components/ImageNew';
import useExpandImage from '../../hooks/useExpandImage';
import usePostData from '../../hooks/usePostData';
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import useFind from '../../hooks/useFind';
import useColorSymbols from '../../hooks/useColorSymbols';
import { IoExpand } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import data from '../../data/SEARCH.json';

const ArchiveItem = ({ index, product, count, handleSlideView }) => {
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
    const { postData, loading, result, error } = usePostData(product);
    const { colorIdentity, manaCost } = useColorSymbols(product);
    const { setUpdateCollection } = useSearch();
    const { expandedImage } = useExpandImage(product);
    const { findMatch, isMatchFound } = useFind();

    const navigate = useNavigate();

    const query = `/api/cards/add/${user.id}/${product.id}`;

    // Removes product name redundencies ex: Adrix and Nev, Twincasters reversible edition
    const filterName = (name) => {
        const sides = name.split('//').map(side => {
            return side.trim();
        })
        if (sides[0] === sides[1]) {
            return sides[0];
        }
        return name;
    }

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
                colorIdentity.map((color) => color) : 'Colorless',
            classList: 'color-symbols'
        },
        {
            title: 'Cost: ',
            value: manaCost && manaCost.map((color) => color),
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

    useEffect(() => {
        // If card was successfully added
        if (result?.isCardAdded) {
            // Trigger update collection @layout/DashboardNav
            // to make new cardName available in search collection
            setIsCardAdded(true);
            setUpdateCollection(true);
        }
        if (error) {
            console.log(error)
        }
    }, [result, setUpdateCollection, error]);

    return (
        <Card classList={"product-container"}>
            <TwoSidedSlide classList={{ container: '', btn: 'card-action-btn b-radius-5 btn-bottom-right color-light' }}>
                <ImageNew
                    product={product}
                    classList='product-image'
                >
                    {
                        (product.finishes[0] === 'foil') &&
                        <div className="product-finish">
                            <span className='foil'>{data.product.finishes[product.finishes]}</span>
                        </div>
                    }
                    <Drop
                        id={'expand-image'}
                        classList={'product-btn absolute btn-center-right box-size-8 border-light-2 color-light bg-alpha b-radius-5'}
                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                    >
                        <IoExpand className='expand-icon' />
                    </Drop>
                    {
                        loading ?
                            <Drop classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right b-radius-5'} >
                                <Loader classList={'relative color-light bg-alpha'} />
                            </Drop>
                            :
                            (isCardAdded || isMatchFound) ?
                                <Drop classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right disabled b-radius-5'} disabled={true}>
                                    <FaCheck />
                                </Drop>
                                :
                                <Drop classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right b-radius-5'} handleClick={() => postData(token, query)}>
                                    <FaPlus />
                                </Drop>
                    }
                </ImageNew>
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
                        !product.name.includes('//') ? product.name : filterName(product.name)
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
