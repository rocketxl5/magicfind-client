import { useState, forwardRef } from 'react';
import { FiPlus } from "react-icons/fi";
import Result from './Result';
import Header from '../../layout/Header';
import Button from '../../layout/Button';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import ProductHandlers from './ProductHandlers';
import ProductOwner from './ProductOwner';
import data from '../../../assets/data/PRODUCT.json';

const Product = forwardRef(function Product(props, ref) {
    const { index, count, card, search, handleModalProductView, handleModalProductState } = props;
    // States
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const { tabs } = data;

    const handleClick = (e) => {
        // console.log(e.target.disabled)
        setActiveTab(e.target.id)
    }
    // console.log(search)
    return (
        <li className="product" ref={ref}>
            <Header title={card.name} classList={'product-header'} >
                <Result count={count} result={index + 1} />
            </Header>
            <div className="product-wrapper" >

                {/* <button type="button" onClick={() => detailsRef.current.classList.toggle('show-details')}>
                    <FiPlus />
                </button> */}

                <section>
                <ProductImage product={card} loading={loading} handleClick={handleModalProductView} />
                </section>
                <section>
                    <div className="product-nav">
                        <div className="contextual-tabs">
                            {
                                tabs.map((tab, i) => {
                                    return (
                                        <Button key={i + index} attributes={tab} handleClick={handleClick} active={activeTab} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <ProductOwner id={'product-status'} product={card} active={activeTab} search={search} />
                    <ProductDetails id={'product-info'} product={card} active={activeTab} search={search} />
                    <ProductHandlers id={'product-actions'} product={card} active={activeTab} search={search} setLoading={value => setLoading(value)} handleClick={handleModalProductState} />
                </section>
            </div>
        </li>
    )

})

export default Product;
