import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import ProductImage from './components/ProductImage';
import ExpandImgBtn from './components/ExpandImgBtn';
import Image from '../../components/Image';
import ProductHeader from './components/ProductHeader';
import ProductDetails from './components/ProductDetails';
import ProductActions from './components/ProductActions';
import QuantitySelector from './components/QuantitySelector';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import Alert from './components/Alert';
import Button from '../../components/Button';
import Drop from '../../components/Drop';
import Avatar from '../../components/Avatar';
import Loader from '../../layout/Loader';
import useAuth from '../../hooks/contexthooks/useAuth';
import useCart from '../../hooks/contexthooks/useCart';
import useUpdateCart from '../../hooks/useUpdateCart';
import useExpandImage from '../../hooks/useExpandImage';
import data from '../../data/SEARCH.json';
import { FaRegCheckCircle } from "react-icons/fa";

const CatalogItem = ({ index, product, count, handleSlideView }) => {
    // If defined, then item is in cart
    const [cartIndex, setCartIndex] = useState(undefined);
    const { name, set_name, price, quantity, language, condition, finishes, seller } = product;
    const { userName, country, avatar, rating, email } = seller;

    const url = `/api/catalog/${seller.userID}/${product._id}/`;
    const headers = {
        'Content-Type': 'application/json'
    };

    const navigate = useNavigate();

    const { cartItems } = useCart();

    const { loading, updateCartHandler } = useUpdateCart(url, headers, product, cartIndex);

    const { expandedImage } = useExpandImage(product);

    const details = [
        {
            title: 'Edition:',
            value: set_name
        },
        {
            title: 'Finish:',
            value: data.product.finishes[finishes]
        },
        {
            title: 'Condition:',
            value: data.product.conditions[condition]
        },
        {
            title: 'Language:',
            value: data.product.languages[language]
        },
        {
            title: 'Price:',
            value: `$ ${price} `
        },
        {
            title: 'Quantity available:',
            value: quantity
        }
    ];

    useEffect(() => {
        if (cartItems.length) {
            const foundIndex = cartItems.findIndex((item) => {
                return item.selected._id === product._id;
            });
        // If index >= 0: Product is already in cart
            if (foundIndex > -1) {
                // setQuantitySelected(cartItems[foundIndex].quantity);
                setCartIndex(foundIndex);
            }
        }
    }, [cartItems])

    return (
        <>
            <ProductHeader classList={'flex align-center space-between one'}>

                <Title classList={'product-title'} text={product.name} />
                <CountDown count={count} unit={index + 1} type={'Result'} />

            </ProductHeader>
            {loading && <Loader />}
            <ProductImage classList={'product-image two'}>
                <Image
                    classList={'col-12'}
                    product={product}
                    handleClick={() => navigate(
                        `/product/${product._id}`,
                        {
                            state: { product: product }
                        })}
                />
                <ExpandImgBtn
                    handleClick={handleSlideView}
                    cardLayout={product.layout}
                    expandedImage={expandedImage}
                />
                {
                    cartItems[cartIndex] &&
                    <Drop classList={'bg-yellow border-dark'} >
                        <span className='fs-100 fw-700 color-dark'>In cart {cartItems[cartIndex].quantity}</span>
                    </Drop>

                }
            </ProductImage>
            <Container classList={'product-details flex column space-between three'}>
                {/* <div className="seller">
                    <p>Seller: <strong>{`${product.seller.userName}`}</strong></p>
                    <p>Rating: {product.seller.rating}</p>
                    <p>Seller Store:
                        <Avatar avatar={product.seller.avatar} handleClick={() => { console.log(seller) }} />
                    </p>
                </div> */}
                <Container>
                {
                    details &&
                    details.map((detail, i) => {
                        return (
                            <p key={i}><span>{detail.title}</span>  <span>{detail.value}</span></p>
                        )
                    })
                    }
                </Container>
                {

                    // <Alert classList={'flex align-center'}>
                    //     <p className='flex align-center gap-1 space-between '>
                    //         <span className='fs-125'>
                    //             {quantitySelected} {quantitySelected > 1 ? 'copies' : 'copy'} in cart
                    //         </span>
                    //         <span>
                    //             <FaRegCheckCircle className='d-block fs-175 stroke-width color-success' />
                    //         </span>
                    //     </p>
                    // </Alert>
                }
                <Container classList={'col-12 align-right dropdown'}>
                    <label className='strong' htmlFor={`item${index}`}>Quantity Selected </label>
                    <QuantitySelector
                        id={`item${index}`}
                        name={'catalog-item'}
                        classList={'col-8'}
                        // Product already in cart have defined cartIndex
                        quantitySelected={cartItems[cartIndex] ? cartItems[cartIndex].quantity : 0}
                        quantityAvailable={quantity}
                        product={product}
                        handleChange={updateCartHandler}

                    >
                    </QuantitySelector>
                </Container>
            </Container>
            <ProductActions classList={'product-actions four'}>
                {/* <Button
                    classList={'btn-small product-btn bg-primary'}
                    title={'Add to wishlist'}
                    handleClick={() => console.log('wishlist')}
                >
                    {'Wishlist'}
                </Button> */}
                {/* <QuantitySelector
                    classList={'dropdown product-dropdown'}
                    name={'catalog-item'}
                    // Product already in cart have defined cartIndex
                    quantitySelected={quantitySelected}
                    quantityAvailable={quantity}
                    product={product}
                    handleChange={updateCartHandler}
                /> */}

            </ProductActions>
        </>
    )
}


export default CatalogItem