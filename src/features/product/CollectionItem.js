import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import ProductImage from './components/ProductImage';
import ExpandImgBtn from './components/ExpandImgBtn';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import Drop from '../../components/Drop';
import Image from '../../components/Image';
import ProductHeader from './components/ProductHeader';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import Button from '../../components/Button';
import useExpandImage from '../../hooks/useExpandImage';
import useViewport from '../../hooks/contexthooks/useViewport';
import data from '../../data/SEARCH.json';
import { FaCommentsDollar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import timestampConverter from '../../assets/utilities/timestampConverter';

const CollectionItem = ({ index, product, count, handleCollectionItem, handleSlideView }) => {
    const { longDate } = timestampConverter;
    // const { name, set_name, price, quantity, language, condition, finishes, seller } = product;

    // const navigate = useNavigate();

    const { isMobile } = useViewport();
    const { expandedImage } = useExpandImage(product);
    console.log(product)
    const details = [
        {
            title: 'Status:',
            value: product._is_published ? 'Published' : 'Unpublished'
        },
        {
            title: 'Published On:',
            value: longDate(product._date_published)
        },
        {
            title: 'Finish:',
            value: data.product.finishes[product.finishes]
        },
        {
            title: 'Condition:',
            value: data.product.conditions[product._condition]
        },
        {
            title: 'Language:',
            value: data.product.languages[product._language]
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
                    {
                        !isMobile || product.name.length < 35 ?
                            product.name :
                            `${product.name.substring(0, 30)}...`
                    }
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
                <ExpandImgBtn
                    handleClick={handleSlideView}
                    layout={product.layout}
                    image={expandedImage}
                />
                {
                    product._is_published &&
                    <Drop classList={'collection-btn color-light bg-success border-light'}>
                        <FaCommentsDollar />
                    </Drop>
                }
                {/* <ExpandImgBtn handleClick={handleSlideView} cardLayout={product.layout} expandedImage={expandedImage} /> */}
            </ProductImage>
            <Container classList={'flex column space-between three'}>
                {
                    product._is_published &&
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
                }
                <div className={`${!product._is_published && 'push-down'} col-12 flex flex-end gap-1`}>
                    {/* <label className='strong col-9 fs-125 text-center push-right d-block padding-bottom-1' htmlFor={`item${index}`}>Quantity Selected </label> */}
                    <Button
                        id={'delete-product'}
                        classList={'btn-tiny bg-danger flex-grow-1'}
                        handleClick={(e) => handleCollectionItem(e, product)}
                    >
                        <AiOutlineDelete />
                    </Button>
                    <Button
                        id={'edit-product'}
                        classList={'btn-tiny bg-success flex-grow-1'}
                        handleClick={(e) => handleCollectionItem(e, product)}
                    >
                        <AiOutlineEdit />
                    </Button>

                </div>
            </Container>
        </>
    )
}


export default CollectionItem