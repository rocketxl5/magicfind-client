import { useState, forwardRef } from 'react';
import CardDetailSection from './CardDetailSection';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import Image from './CardImage';
import ExpandBtn from './cardbtn/ExpandBtn';

import Seller from './product/Seller';
import Order from './product/Order';
import Detail from './product/Detail';

import useAttributes from '../../../hooks/useAttributes';
import data from '../../../assets/data/SEARCH';


const Product = forwardRef(function Product(props, ref) {
    const { index, card, searchType, handleCardView, handleCardState } = props;
    const [loading, setLoading] = useState(false);
    const { attributes } = useAttributes(card);

    return (
        <li className="product" ref={ref}>

            <header className="product-header">
                <h3>{card.name}</h3>
                <p>{card.set_name}</p>
            </header>

            <div className="product-grid" >
                <section className="image">
                    <Image card={card} handleCardView={handleCardView} />
                    <ExpandBtn />
                </section>
                <section className="information section">
                    <span>{data.product.conditions[`${card.condition}`]}</span>
                    <span>{data.product.languages[`${card.language}`]}</span>

                    {/* <h2>Detail</h2> */}
                    {/* <CardDetailSection index={index} card={card} searchType={searchType} loading={loading} /> */}
                    {/* <Detail product={card} /> */}
                </section>
                <section className="specifications section">
                    {/* <h2>Seller</h2> */}
                    {/* <Seller product={card} /> */}
                </section>
                <section className="handlers section">
                    {/* <h2>Order</h2> */}
                    {/* <Order product={card} /> */}
                </section>
            </div>
            {/* <footer className="card-footer" onClick={(e) => handleCardState(e, card, attributes)}>
                {searchType === 'search-catalog' ? (
                    // <CatalogCardFooter card={card} />
                    ''
                ) :
                    searchType === 'search-collection' ? (
                        <CollectionCardFooter card={card} />
                    ) : (
                        <ApiCardFooter card={card} setLoading={(value) => { setLoading(value) }} />
                    )
                }
            </footer> */}

        </li>
    )

})

export default Product;
