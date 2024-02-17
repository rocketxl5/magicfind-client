import { useState, forwardRef } from 'react';
import { FiPlus } from "react-icons/fi";
import Result from './Result';
import Header from '../../layout/Header';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import ProductHandlers from './ProductHandlers';

const Product = forwardRef(function Product(props, ref) {
    const { index, count, card, search, handleModalProductView, handleModalProductState } = props;
    const [loading, setLoading] = useState(false);


    return (
        <li className="product" ref={ref}>
            <Header title={card.name} classList={'product-header'} />
            <div className="product-container" >

                {/* <button type="button" onClick={() => detailsRef.current.classList.toggle('show-details')}>
                    <FiPlus />
                </button> */}
                <ProductImage product={card} loading={loading} handleClick={handleModalProductView} />
                <ProductDetails product={card} search={search} />
                <ProductHandlers product={card} search={search} setLoading={value => setLoading(value)} handleClick={handleModalProductState} />
                <Result count={count} result={index + 1} />

                {
                    search !== "api" &&
                    <section className={`${search} user section`}>
                        <h2>Seller</h2>
                    {/* <Seller product={card} /> */}
                            {/* {

                                search === 'catalog' ? (
                                    <>
                                        <span>{data.product.conditions[`${card.condition}`]}</span>
                                        <span>{data.product.languages[`${card.language}`]}</span>
                                    </>
                                ) : search === 'collection'(
                                    <>
                                        <span>{data.product.conditions[`${card.condition}`]}</span>
                                        <span>{data.product.languages[`${card.language}`]}</span>
                                    </>
                                )

                            } */}
                </section>
                }

            </div>
        </li>
    )

})

export default Product;
