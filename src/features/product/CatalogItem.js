import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from './components/ProductImage';
import ProductHeader from './components/ProductHeader';
import Container from '../../components/Container';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import Title from '../../components/Title';
import Drop from '../../components/Drop';
import Image from '../../components/Image';
import Loader from '../../layout/Loader';
import CountDown from '../search/components/CountDown';
import Confirmation from './components/Confirmation';
import ExpandImgBtn from './components/ExpandImage';
import QuantitySelector from './components/QuantitySelector';
import Alert from './components/Alert';
import Avatar from '../../components/Avatar';
import useAuth from '../../hooks/contexthooks/useAuth';
import useCart from '../../hooks/contexthooks/useCart';
import useExpandImage from '../../hooks/useExpandImage';
import useUpdateCart from '../../hooks/useUpdateCart';
import useViewport from '../../hooks/contexthooks/useViewport';
import useFind from '../../hooks/useFind';
import { FiShoppingCart } from "react-icons/fi";

import data from '../../data/SEARCH.json';


const CatalogItem = ({ index, product, count, handleSlideView }) => {
    // If defined, then item is in cart
    // const [indexFound, setindexFound] = useState(undefined);
    const {
        name,
        set_name,
        price,
        quantity,
        language,
        condition,
        finishes,
        seller
    } = product;
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
    }, [cartItems]);

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
                    layout={product.layout}
                    image={expandedImage}
                />
                {
                    cartItems[indexFound] &&
                    <Drop classList={'catalog-btn color-light bg-success border-light bg-success'} >
                        <FiShoppingCart className={'cart-svg'} />
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
                <List classList={'product-details'}>
                {
                    details &&
                    details.map((detail, i) => {
                        return (
                            <ListItem key={i} classList='product-detail'>
                                <span className='detail-title'>{detail.title}</span><span className={`${detail.classList ? detail.classList : 'detail-value'}`}>{detail.value}</span>
                            </ListItem>
                        )
                    })
                    }
                </List>
                <div className='col-12 flex flex-end gap-1'>
                    <label className='strong col-9 fs-125 vertical-align-middle text-center align-self-center push-right d-block' htmlFor={`item${index}`}>Quantity: </label>
                    <Container classList={'col-8 text-right dropdown'}>
                        <QuantitySelector
                            id={`item${index}`}
                            classList={'col-12'}
                            name={'catalog-item'}
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