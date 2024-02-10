import { useState, forwardRef } from 'react';
import CardDetailSection from './CardDetailSection';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import Image from './CardImage';
import ExpandBtn from './cardbtn/ExpandBtn';

import Seller from './product/Seller';
import Catalog from './product/Catalog';
import API from './product/API';
import Collection from './product/Collection';
import Detail from './product/Detail';

import useAttributes from '../../../hooks/useAttributes';
import capitalizeWord from '../../../assets/utilities/capitalizeWord';
import getYear from '../../../assets/utilities/getYear';
import data from '../../../assets/data/SEARCH';
import useColorIdentity from '../../../hooks/useColorIdentity';


const Product = forwardRef(function Product(props, ref) {
    const { index, card, searchType, handleCardView, handleCardState } = props;
    const [loading, setLoading] = useState(false);
    const { attributes } = useAttributes(card);

    const { colorIdentity, manaCost } = useColorIdentity(card, data);
    // const re = /\{([^}]+)\}/;
    // console.log(card.mana_cost.split(/\{([^}]+)\}/).filter(value => value))
    // console.log(colorIdentity)
    // console.log(manaCost)
    // console.log(card)
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
                <section className={`${searchType} information section`}>
                    <h2>Detail</h2>
                    {


                        searchType === 'search-catalog' ? (
                            <>
                                <span>{data.product.conditions[`${card.condition}`]}</span>
                                <span>{data.product.languages[`${card.language}`]}</span>

                            </>
                        ) : searchType === 'search-collection' ? (
                            <>
                                <span>{data.product.conditions[`${card.condition}`]}</span>
                                <span>{data.product.languages[`${card.language}`]}</span>
                            </>
                        ) : (
                            <>
                                {
                                }
                                <span>Year: {`${getYear(card.released_at)}`}</span>
                                <span>Rarity: {`${capitalizeWord(card.rarity)}`}</span>
                                <span>Language: {`${data.product.languages[card.lang]}`}</span>
                                <span>Collector #: {card.collector_number}</span>
                                <span className="color-identity">Color Identity: {colorIdentity && colorIdentity.map((id, i) => id)}</span>
                                <span className="color-identity">Mana Cost: {manaCost && manaCost.map((id, i) => id)}</span>

                            </>
                        )

                    }

                    {/* <CardDetailSection index={index} card={card} searchType={searchType} loading={loading} /> */}
                    {/* <Detail product={card} /> */}
                </section>
                {
                    searchType !== "search-api" &&
                    <section className={`${searchType} user section`}>
                        <h2>Seller</h2>
                    {/* <Seller product={card} /> */}
                            {

                                searchType === 'search-catalog' ? (
                                    <>
                                        <span>{data.product.conditions[`${card.condition}`]}</span>
                                        <span>{data.product.languages[`${card.language}`]}</span>
                                    </>
                                ) : searchType === 'search-collection'(
                                    <>
                                        <span>{data.product.conditions[`${card.condition}`]}</span>
                                        <span>{data.product.languages[`${card.language}`]}</span>
                                    </>
                                )

                            }
                </section>
                }
                <section className={`${searchType} handler section`}>
                    {/* <h2>Handler</h2> */}
                    {
                        searchType === 'search-catalog' ? (
                            <>
                                <Catalog product={card} />
                            </>
                        ) : searchType === 'search-collection' ? (
                            <>
                                <Collection />
                            </>
                        ) : (
                            <>
                                <API card={card} setLoading={setLoading} />
                            </>
                        )

                    }
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
