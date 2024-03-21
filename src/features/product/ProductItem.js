import { useState, forwardRef } from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Button from '../../components/Button'
import CountDown from '../search/components/CountDown';
import ProductImage from './ProductImage';
import Title from '../../components/Title';
import ListItem from '../../components/ListItem';
import ProductDetails from './ProductDetails';
import ProductHandlers from './ProductHandlers';
import ProductOwner from './ProductOwner';
import data from '../../data/PRODUCT.json';

const ProductItem = forwardRef(function Product(props, ref) {
    const { index, count, card, search, handleSlideView, handleProductForm } = props;

    // const { header, title } = data['singles'];
    // console.log(header)
    // console.log(title)

    return (
        <ListItem classList={'product-item'} ref={ref}>
            {/* <Header classList={header.classList} >
                <Title classList={title.classList} text={card.name} />
                <CountDown count={count} unit={index + 1} type={'Result'} />
            </Header> */}
            <Container classList={"product-wrapper"}>
                <ProductHandlers id={'product-actions'} product={card} search={search} handleClick={handleProductForm} />
            </Container>
        </ListItem>
    )
})

export default ProductItem;
