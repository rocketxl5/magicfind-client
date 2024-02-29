import { useState, forwardRef } from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Button from '../../components/Button'
import Count from '../search/components/Count';
import ProductImage from './ProductImage';
import Title from '../../components/Title';
import ProductDetails from './ProductDetails';
import ProductHandlers from './ProductHandlers';
import ProductOwner from './ProductOwner';
import data from '../../data/PRODUCT.json';

const Product = forwardRef(function Product(props, ref) {
    const { index, count, card, search, handleSlideView, handleModalProductState } = props;

    const { header, title } = data['singles'];

    return (
        <li className="product" ref={ref}>
            <Header classList={header.classList} >
                <Title classList={title.classList} text={card.name} />
                <Count count={count} unit={index + 1} />
            </Header>
            <Container classList={"product-wrapper"}>


                <>
                    {/* <ProductImage product={card} handleSlideView={handleSlideView} /> */}
                </>
                <>
                    {/* <ProductDetails id={'product-info'} product={card} search={search} /> */}
                    {/* <ProductOwner id={'product-status'} product={card}  search={search} /> */}
                    <ProductHandlers id={'product-actions'} product={card} search={search} handleClick={handleModalProductState} />
                </>
            </Container>
        </li>
    )

})

export default Product;
