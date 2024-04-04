import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../../components/Container';
import Drop from '../../components/Drop';
import ImageNew from '../../components/ImageNew';
import Loader from '../../layout/Loader';
import Confirmation from './components/Confirmation';
import QuantitySelector from './components/QuantitySelector';
import Avatar from '../../components/Avatar';
import useAuth from '../../hooks/contexthooks/useAuth';
import useCart from '../../hooks/contexthooks/useCart';
import useExpandImage from '../../hooks/useExpandImage';
import useUpdateCart from '../../hooks/useUpdateCart';
import useViewport from '../../hooks/contexthooks/useViewport';
import useFind from '../../hooks/useFind';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoExpand } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

import data from '../../data/SEARCH.json';

const CatalogItemNew = ({ index, product, count, cartIndex, handleSlideView }) => {
    const {
        name,
        set_name,
        price,
        quantity,
        seller
    } = product;
    const { userName, country, avatar, rating, email } = seller;

    const url = `/api/catalog/${seller.userID}/${product._id}/`;
    const headers = {
        'Content-Type': 'application/json'
    };

    const cardRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const { isMobile } = useViewport();

    const { cartItems } = useCart();

    const { findIndex, indexFound } = useFind();

    const { error, loading, updateCartHandler } = useUpdateCart(url, headers, product, indexFound);

    const { expandedImage } = useExpandImage(product);

    const details = [
        {
            title: 'Set:',
            value: set_name
        },
        {
            title: 'Finish:',
            value: data.product.finishes[product.finishes]
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
            value: `$ ${price} `
        },
        {
            title: 'Quantity:',
            value: quantity
        }
    ];

    useEffect(() => {
        console.log(product)
        findIndex(product._id)
    }, [location])



    useEffect(() => {
        // Sets the index of product item if found in cart
        // Set null if not
        // @ CatalogItem
        findIndex(product._id)
    }, [cartItems]);


    const turnCard = () => {
        cardRef.current?.classList.toggle('rotate-y-180');
    }

    return (
        <>
            <div className='product-view'>
                <div className="product-container relative">
                    {loading && <Loader classList={'bg-alpha'} />}
                    <div className="slide">
                        <div className="double-faced-card" ref={cardRef}>
                            <div className="double-faced-recto">
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
                                        classList={'drop-bottom absolute color-light bg-primary border-light-2'}
                                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                                    >
                                        <IoExpand />
                                    </Drop>
                                </ImageNew>
                            </div>
                            <div className="double-faced-verso">
                                <div className='product-info'>
                                    <div>
                                        <h2 className='text-center fs-150 fw-500 padding-bottom-dot-5'>{product.name}</h2>
                                    </div>
                                    <table>
                                        <tbody>

                                            {
                                                details &&
                                                details.map((detail, i) => {
                                                    return (
                                                        <tr key={i} className='product-detail'>
                                                            <td className='detail-title col-4'>{detail.title}</td>
                                                            <td className={`detail-value col-8 ${detail.classList ? detail.classList : ''}`}>{detail.value}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-legend absolute flex column space gap-2 justify-center">
                        <Drop
                            id={'info-product'}
                            classList={'color-light bg-primary border-primary'}
                            handleClick={(e) => turnCard(cardRef.current)}
                        >
                            <AiOutlineInfoCircle />
                        </Drop>
                    </div>
                </div>
            </div>
            <div className="col-12 flex column justify-center align-center gap-1">
                {/* <div className="seller">
                    <p>Seller: <strong>{`${product.seller.userName}`}</strong></p>
                    <p>Rating: {product.seller.rating}</p>
                    <p>Seller Store:
                        <Avatar avatar={product.seller.avatar} handleClick={() => { console.log(seller) }} />
                    </p>
                </div> */}
                <span className="product-name">
                    {
                        product.name.length < 35 ?
                            product.name :
                            `${product.name.substring(0, 30)}...`
                    }
                </span>
                <span className="product-edition">
                    {
                        product.set_name
                    }
                </span>
                <div className='col-12 relative'>
                    {/* <label className='strong col-3 fs-125 vertical-align-middle text-center align-self-center d-block' htmlFor={`item${index}`}>Quantity</label> */}
                    <Container classList={'col-5 text-right margin-auto dropdown'}>
                        <QuantitySelector
                            id={`item${index}`}
                            classList={'col-12'}
                            name={'catalog-item'}
                            // Product already in cart have defined indexFound
                            quantitySelected={indexFound !== null ? cartItems[indexFound]?.quantity : 0}
                            quantityAvailable={quantity}
                            product={product}
                            handleChange={updateCartHandler}
                        >
                        </QuantitySelector>
                    </Container>

                    {
                        indexFound !== null &&
                        <span
                            className='in-cart col-2 bg-success color-light box-size-3 border-light-2 b-radius-5 flex align-center justify-center'
                        >
                            <FaCheck className='box-size-2' />
                        </span>
                    }
                </div>
            </div>
            <span className='product-count'>{index + 1} of {count}</span>
        </>
    )
}


export default CatalogItemNew