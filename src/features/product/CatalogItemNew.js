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
import { FiShoppingCart } from 'react-icons/fi';
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
                    {loading && <Loader classList={'bg-alpha card-radius'} />}
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
                            classList={'bg-primary border-light-2'}
                            handleClick={(e) => turnCard(cardRef.current)}
                        >
                            <svg className="svg" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path className="fill-light" d="M884.3,357.6c116.8,117.7,151.7,277-362.2,320V496.4L243.2,763.8L522,1031.3V860.8C828.8,839.4,1244.9,604.5,884.3,357.6z"></path>
                                <path className="fill-grey" d="M557.8,288.2v138.4l230.8-213.4L557.8,0v142.8c-309.2,15.6-792.1,253.6-426.5,503.8C13.6,527.9,30,330.1,557.8,288.2z"></path>
                            </svg>

                        </Drop>
                    </div>
                    <span className='product-count'>{index + 1} of {count}</span>
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
                <div className='col-3 relative'>
                    {/* <label className='strong col-3 fs-125 vertical-align-middle text-center align-self-center d-block' htmlFor={`item${index}`}>Quantity</label> */}
                    <Container classList={'col-12 text-right margin-auto dropdown'}>
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
                        <div
                            className='cart-item absolute flex box-size-6 align-center justify-center'
                        >
                                <FiShoppingCart className='box-size-5' />

                            </div>
                    }
                </div>
            </div>

        </>
    )
}


export default CatalogItemNew