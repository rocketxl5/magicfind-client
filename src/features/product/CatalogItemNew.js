import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Container from '../../components/Container';
import Drop from '../../components/Drop';
import ImageNew from '../../components/ImageNew';
import Loader from '../../layout/Loader';
import Confirmation from './components/Confirmation';
import QuantitySelector from './components/QuantitySelector';
import TwoSidedSlide from '../modal/TwoSidedSlide';
import TurnBtn from '../modal/buttons/TurnBtn';
import Avatar from '../../components/Avatar';
import useAuth from '../../hooks/contexthooks/useAuth';
import useCart from '../../hooks/contexthooks/useCart';
import useExpandImage from '../../hooks/useExpandImage';
import useUpdateCart from '../../hooks/useUpdateCart';
import useViewport from '../../hooks/contexthooks/useViewport';
import useFind from '../../hooks/useFind';
import { FiShoppingCart } from 'react-icons/fi';
import { MdStore } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";

import data from '../../data/SEARCH.json';

const CatalogItemNew = ({ index, product, count, cartIndex, handleSlideView }) => {
    const {
        name,
        set_name,
        price,
        quantity,
        seller
    } = product;

    const url = `/api/catalog/${seller.userID}/${product._id}/`;
    const headers = {
        'Content-Type': 'application/json'
    };

    console.log(product)

    const cardRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth } = useAuth();

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
            value: `$${price} `
        },
        {
            title: 'Quantity:',
            value: quantity
        },
        {
            title: 'Comment:',
            value: product.comment ? product.comment : 'None'
        },

    ];

    // Renders on load with location as trigger
    useEffect(() => {
        findIndex(product._id)
    }, [location])

    useEffect(() => {
        // Renders each time cartItems is updated
        // Sets the index of product item if found in cart
        // Set null if not
        // @ CatalogItem
        findIndex(product._id)
    }, [cartItems]);

    return (
        <>
            {/* <div className='product-view'> */}
            {/* <div className="product-container"> */}
            <>
                    {/* Passing product image & product detail as an array of children @ TwoSidedSlide component */}
                    {/* TwoSidedSlide contains @ TurnBtn which takes a classList argument to specify sizes and absolute coordinates  */}
                <TwoSidedSlide classList={{ container: '', btn: 'card-action-btn' }}>
                        {
                            // Product image (children[0])
                            [
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
                                    {/* <Drop
                                        id={'expand-image'}
                                        classList={'drop-bottom-rightabsolute box-size-8 bg-light-alpha bg-light-alpha border-eclipse-3 b-radius-100 '}
                                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                                    >
                                        <IoExpand className='expand-icon' />
                                    </Drop> */}
                                </ImageNew>,
                                // Product information (children[1])

                            <div className='product'>
                                <section>
                                    {/* {`https://svgs.scryfall.io/card-symbols/${product.set}.svg`} alt={`${product.set_name} Icon`} */}
                                            <div>
                                        <h2 className='text-center fs-150 fw-500'>Negate <span><img src='' /></span></h2>
                                            </div>
                                            <div className='b-radius-5 border-surface-thin'>
                                                <table>
                                                    <tbody>

                                                        {
                                                            details &&
                                                            details.map((detail, i) => {
                                                                return (
                                                                    <tr key={1 + i}>
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
                                <section className='product-seller flex column gap-dot-5 height-100 relative b-radius-5 border-surface-thin'>
                                    {/* <Avatar classList={'absolute box-size-8 drop-top-right border-eclipse-2'} avatar={product.seller.avatar} handleClick={() => navigate(`/store/${product.seller.userID}`, {
                                                state: {
                                                    user: product.seller
                                                }
                                    })} /> */}

                                    <Drop
                                        classList={'drop-bottom-left absolute box-size-8 bg-transparent border-eclipse-2 b-radius-100 '}
                                        handleClick={() => navigate(`/store/${product.seller.userID}`, {
                                            state: {
                                                user: product.seller
                                            }
                                        })}
                                    >
                                        <MdStore />
                                    </Drop>
                                    <Drop
                                        classList={'drop-bottom-center absolute box-size-8 bg-transparent border-eclipse-2 b-radius-100 '}
                                        handleClick={() => navigate(`/mail/${product.seller.userID}`, {
                                            state: {
                                                user: product.seller
                                            }
                                        })}
                                    >
                                        <MdOutlineEmail />
                                    </Drop>
                                    <div className='col-8 flex column height-100 padding-1'>
                                        <section className='flex gap-1'>
                                            <span className=' fs-125 spec-title'>Seller:</span>
                                            <span className=' fs-125 spec-value'>
                                                {`${product.seller.userName}`}
                                            </span>
                                        </section>
                                        <section>
                                            <span className=' fs-125 inline-block rating'>{product.seller.rating}</span>
                                        </section>
                                    </div>
                                </section>
                            </div>
                            ]
                        }
                    </TwoSidedSlide>
                    <span className='product-count'>{index + 1} of {count}</span>
            </>
            {/* </div> */}
            {/* </div> */}
            <div className="col-12 relative flex column justify-center align-center gap-1">


                <div className='relative col-12 flex align-center justify-center gap-1'>
                    <span className='fw-200'>
                        {
                            data.product.conditions[product.condition]
                        }
                    </span>
                    <GoShieldCheck strokeWidth={'1px'} />
                    <span className='fw-200'>
                        {
                            data.product.languages[product.language]
                        }
                    </span>
                    <GoShieldCheck strokeWidth={'1px'} />
                    <span className='fw-300'>
                        {
                            `$${price} `
                        }
                    </span>
                </div>
                <div className='col-6 relative'>
                    <Container classList={'col-12 text-right margin-auto dropdown'}>
                        <QuantitySelector
                            id={`item${index}`}
                            classList={'col-12'}
                            name={'catalog-item'}
                            // Product already in cart have defined indexFound
                            quantitySelected={cartItems[indexFound]?.quantity || 0}
                            quantityAvailable={quantity}
                            product={product}
                            handleChange={updateCartHandler}
                        >
                        </QuantitySelector>
                    </Container>


                    <div className='
                        cart-item 
                        absolute 
                        flex 
                        box-size-6 
                        align-center 
                        justify-center'>
                        {loading && <Loader classList={'bg-eclipse color-light'} />}
                        {
                            cartItems[indexFound]?.quantity && !loading ?
                                <FiShoppingCart className='box-size-5' /> :
                                ''
                        }
                    </div>
                </div>
            </div>

        </>
    )
}


export default CatalogItemNew