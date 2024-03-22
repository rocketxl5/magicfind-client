import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import ProductImage from '../product/components/ProductImage';
import ExpandImgBtn from '../product/components/ExpandImgBtn';
import Image from '../../components/Image';
import ProductHeader from '../product/components/ProductHeader';
import ProductDetails from '../product/components/ProductDetails';
import ProductActions from '../product/components/ProductActions';
import QuantitySelector from '../product/components/QuantitySelector';
import Header from '../../components/Header';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import { FaRegCheckCircle } from "react-icons/fa";
import Alert from '../product/components/Alert';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import Loader from '../../layout/Loader';
import useAuth from '../../hooks/contexthooks/useAuth';
import useCart from '../../hooks/contexthooks/useCart';
import useUpdateCart from '../../hooks/useUpdateCart';
import useExpandImage from '../../hooks/useExpandImage';
import data from '../../data/SEARCH.json';
import { FiPlus } from "react-icons/fi";

const CatalogItem = ({ index, product, count, handleSlideView }) => {
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [cartIndex, setCartIndex] = useState(undefined);
    const { name, set_name, price, quantity, language, condition, finishes, seller } = product;
    const { userName, country, avatar, rating, email } = seller;

    const url = `/api/catalog/${seller.userID}/${product._id}/`;
    const headers = {
        'Content-Type': 'application/json'
    };

    console.log(product)

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
            value: data.product.finish[finishes]
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
        // Check for product match in cartItems 
        const index = cartItems.findIndex((item) => {
            return item.selected._id === product._id;
        });
        // If index >= 0: Product is already in cart
        if (index > -1) {
            setQuantitySelected(cartItems[index].quantity);
            setCartIndex(index);
        }
    }, [cartItems]);

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
                <ExpandImgBtn handleClick={handleSlideView} cardLayout={product.layout} expandedImage={expandedImage} />
            </ProductImage>
            <ProductDetails classList={'product-details three'}>
                {/* <div className="seller">
                    <p>Seller: <strong>{`${product.seller.userName}`}</strong></p>
                    <p>Rating: {product.seller.rating}</p>
                    <p>Seller Store:
                        <Avatar avatar={product.seller.avatar} handleClick={() => { console.log(seller) }} />
                    </p>
                </div> */}
                {
                    details &&
                    details.map((detail, i) => {
                        return (
                            <Container key={i} classList={''}>
                                <p><span className="">{detail.title}</span>  <span className="">{detail.value}</span></p>
                            </Container>
                        )
                    })
                }
            </ProductDetails>
            <ProductActions classList={'product-actions four'}>
                {
                    quantitySelected &&
                    <Alert classList={'flex align-center'}>
                        <p className='flex align-center gap-1 space-between '>
                            <span className='fs-125'>
                                {quantitySelected} {quantitySelected > 1 ? 'copies' : 'copy'} in cart
                            </span>
                            <span>
                                <FaRegCheckCircle className='d-block fs-175 stroke-width color-success' />
                            </span>
                        </p>
                    </Alert>
                }
                <Button
                    classList={'btn-small product-btn bg-primary'}
                    title={'Add to wishlist'}
                    handleClick={() => console.log('wishlist')}
                >
                    {'Wishlist'}
                </Button>
                <QuantitySelector
                    classList={'dropdown product-dropdown'}
                    name={'catalog-item'}
                    // Product already in cart have defined cartIndex
                    quantitySelected={quantitySelected}
                    quantityAvailable={quantity}
                    product={product}
                    handleChange={updateCartHandler}
                />

            </ProductActions>
        </>
    )
}


export default CatalogItem