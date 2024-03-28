import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import ProductImage from './components/ProductImage';
import ExpandImgBtn from './components/ExpandImgBtn';
import Drop from '../../components/Drop';
import Image from '../../components/Image';
import ProductHeader from './components/ProductHeader';
import ProductDetails from './components/ProductDetails';
import ProductActions from './components/ProductActions';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import Button from '../../components/Button';
import useExpandImage from '../../hooks/useExpandImage';
import data from '../../data/SEARCH.json';
import { FaStore } from "react-icons/fa6";

import timestampConverter from '../../assets/utilities/timestampConverter';

const CollectionItem = ({ index, product, count, handleCollectionItem }) => {
    const { conditions, languages, finishes } = data.product;
    const { longDate } = timestampConverter;
    // const { name, set_name, price, quantity, language, condition, finishes, seller } = product;

    const navigate = useNavigate();

    const details = [
        {
            title: 'Published On:',
            value: longDate(product._date_published)
        },
        {
            title: 'Finish:',
            value: finishes[product.finishes]
        },
        {
            title: 'Condition:',
            value: conditions[product._condition]
        },
        {
            title: 'Language:',
            value: languages[product._language]
        },
        {
            title: 'Price:',
            value: `$ ${product._price} `
        },
        {
            title: 'Quantity available:',
            value: product._quantity
        }
    ];

    return (
        <>
            <ProductHeader classList={'flex align-center space-between one'}>
                <Title classList={'product-title'}>
                    <span>{product.name}</span>
                </Title>
                <CountDown count={count} unit={index + 1} type={'Result'} />
            </ProductHeader>
            <ProductImage classList={'relative col-12 flex flex-grow-1 flex-basis-0  product-image two'}>
                <Image
                    classList={'col-12'}
                    product={product}
                    // handleClick={() => navigate(
                    //     `/product/${product._id}`,
                    //     {
                    //         state: { product: product }
                    //     })}
                />
                {
                    product._is_published &&
                    <Drop classList={'bg-success absolute'}>
                        <FaStore />
                    </Drop>
                }
                {/* <ExpandImgBtn handleClick={handleSlideView} cardLayout={product.layout} expandedImage={expandedImage} /> */}
            </ProductImage>
            <ProductDetails classList={'product-details three'}>
                <Container>
                    <p>Status: {product._is_published ? 'Published' : 'Unpublished'}</p>
                </Container>
                {
                    (product._is_published) &&
                    details.map((detail, i) => {
                        return (
                            <Container key={i} classList={''}>
                                <p><span className="">{detail.title}</span><span className="">{detail.value}</span></p>
                            </Container>
                        )
                    })
                }
            </ProductDetails>
            <ProductActions classList={'product-actions four'}>
                <Button
                    id={'edit-product'}
                    classList={'btn-small product-btn bg-primary'}
                    title={'Add to wishlist'}
                    handleClick={(e) => handleCollectionItem(e, product)}
                >
                    {'Edit'}
                </Button>
                <Button
                    id={'delete-product'}
                    classList={'btn-small product-btn bg-danger'}
                    title={'Add to wishlist'}
                    handleClick={(e) => handleCollectionItem(e, product)}
                >
                    {'Delete'}
                </Button>
            </ProductActions>
        </>
    )
}


export default CollectionItem