import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import ProductImage from './components/ProductImage';
import ExpandImgBtn from './components/ExpandImgBtn';
import Image from '../../components/Image';
import ProductHeader from './components/ProductHeader';
import QuantitySelector from './components/QuantitySelector';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import Alert from './components/Alert';
import Confirmation from './components/Confirmation';
import Drop from '../../components/Drop';
import Avatar from '../../components/Avatar';
import Loader from '../../layout/Loader';
import useAuth from '../../hooks/contexthooks/useAuth';
import useCart from '../../hooks/contexthooks/useCart';
import useExpandImage from '../../hooks/useExpandImage';
import useUpdateCart from '../../hooks/useUpdateCart';
import useViewport from '../../hooks/contexthooks/useViewport';
import useFind from '../../hooks/useFind';
import { FiShoppingCart } from "react-icons/fi";

import data from '../../data/SEARCH.json';


const CatalogItem = ({ index, product, search, count, handleSlideView }) => {
    // If defined, then item is in cart
    // const [indexFound, setindexFound] = useState(undefined);
    const { name, set_name, price, quantity, language, condition, finishes, seller } = product;
    const { userName, country, avatar, rating, email } = seller;

    const url = `/api/catalog/${seller.userID}/${product._id}/`;
    const headers = {
        'Content-Type': 'application/json'
    };

    const navigate = useNavigate();

    const { isMobile } = useViewport();

    const { cartItems } = useCart();

    const { findIndex, indexFound } = useFind();

    const { error, loading, showConfirmation, updateCartHandler } = useUpdateCart(url, headers, product, indexFound);

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
        findIndex(product._id);
    }, []);

    return (
        <>
            <ProductHeader classList={'flex align-center space-between one'}>
                <Title classList={'product-title'}>
                    {
                        !isMobile || product.name.length < 35 ?
                            product.name :
                            `${product.name.substring(0, 30)}...`
                    }
                </Title>
                <CountDown count={count} unit={index + 1} type={'Result'} />
            </ProductHeader>
            {loading && <Loader />}
            {showConfirmation && <Confirmation message={!error ? 'Cart Successfuly Updated' : 'An Error Occured'} isSuccess={!error ? true : false} />}
            <ProductImage classList={'product-image two'}>
                <Image
                    classList={'col-12'}
                    product={product}
                    // handleClick={() => navigate(
                    //     `/product/${product._id}`,
                    //     {
                    //         state: { product: product }
                    //     })}
                />
                <ExpandImgBtn
                    handleClick={handleSlideView}
                    cardLayout={product.layout}
                    expandedImage={expandedImage}
                />
                {
                    cartItems[indexFound] &&
                    <Drop classList={'bg-success absolute'} >
                        {/* <div className='relative flex align-center justify-center square-size-2'> */}
                        <FiShoppingCart />
                        {/* </div> */}
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
                <div className='col-12'>
                    <label className='strong col-9 fs-125 text-center move-right d-block padding-bottom-1' htmlFor={`item${index}`}>Quantity Selected </label>
                    <Container classList={'col-12 text-right dropdown'}>
                    <QuantitySelector
                        id={`item${index}`}
                        name={'catalog-item'}
                            classList={'col-9 move-right'}
                            // Product already in cart have defined indexFound
                            quantitySelected={cartItems[indexFound] ? cartItems[indexFound].quantity : 0}
                        quantityAvailable={quantity}
                        product={product}
                        handleChange={updateCartHandler}

                    >
                    </QuantitySelector>
                </Container>
                </div>
            </Container>
        </>
    )
}


export default CatalogItem