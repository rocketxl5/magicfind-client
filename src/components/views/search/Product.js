import { useState, forwardRef, useRef, useEffect } from 'react';
import { FiPlus } from "react-icons/fi";
import CardDetailSection from './CardDetailSection';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import Image from './CardImage';


import Seller from './product/Seller';
import Catalog from './product/Catalog';
import API from './product/API';
import Collection from './product/Collection';
import Detail from './product/Detail';

import useAttributes from '../../../hooks/useAttributes';
import capitalizeWord from '../../../assets/utilities/capitalizeWord';
import getYear from '../../../assets/utilities/getYear';
import data from '../../../assets/data/SEARCH';
import useColorSymbols from '../../../hooks/useColorSymbols';
import Loading from '../../layout/Loading';


const Product = forwardRef(function Product(props, ref) {
    const { index, card, searchType, handleCardView, handleCardState } = props;
    const [loading, setLoading] = useState(false);
    const { attributes } = useAttributes(card);
    const detailsRef = useRef(null);

    const { colorIdentity, manaCost } = useColorSymbols(card);

    return (
        <li className="product" ref={ref}>

            <header className="product-header">
                <h3>{card.name}</h3>
            </header>

            <div className="product-container" >

                {/* <button type="button" onClick={() => detailsRef.current.classList.toggle('show-details')}>
                    <FiPlus />
                </button> */}
                <section className="product-image">
                    {
                        loading ? (
                            <Loading />
                        ) : (

                            <Image card={card} handleCardView={handleCardView} />
                        )
                    }
                </section>
                <section className={`${searchType} product-details`} ref={detailsRef}>
                    {/* <div className="inner">
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
                                            <div className="row">

                                                <div className="column categories">
                                                    <p>Type:</p>
                                                    <p className="color-identity">Color:</p>
                                                    <p className="color-identity">Mana:</p>
                                                    <p>Year: </p>
                                                    <p>Rarity: </p>
                                                    <p>Language: </p>
                                                    <p>Collector #: </p>
                                                    <p>Artist: </p>
                                                    <p>Frame:</p>
                                                    {
                                                        !card.finishes.includes('nonfoil') &&
                                                        <p>Finish:</p>
                                                    }
                                                </div>
                                                <div className="column values">
                                                    <p>{card.type_line.split('—')[0]}</p>
                                                    {
                                                        card.color_identity &&
                                                        <p className="color-identity">{colorIdentity.lenght ? colorIdentity.map((id, i) => id) : 'Colorless'}</p>
                                                    }
                                                    
                                                    <p className="color-identity">{manaCost && manaCost.map((id, i) => id)}</p>
                                                    <p>{`${getYear(card.released_at)}`}</p>
                                                    <p>{`${capitalizeWord(card.rarity)}`}</p>
                                                    <p>{`${data.product.languages[card.lang]}`}</p>
                                                    <p>{card.collector_number}</p>
                                                    <p>{card.artist}</p>
                                                    <p>{card.frame}</p>
                                                    {
                                                        !card.finishes.includes('nonfoil') &&

                                                        <p className={`${card.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''}`}>
                                                            {` ${capitalizeWord(card.finishes[0])}`}
                                                        </p>

                                                    }

                                                </div>
                                            </div>

                            </>
                        )

                    }
                    </div> */}

                    {/* <CardDetailSection index={index} card={card} searchType={searchType} loading={loading} /> */}
                    {/* <Detail product={card} /> */}
                </section>

                {
                    searchType !== "search-api" &&
                    <section className={`${searchType} user section`}>
                        <h2>Seller</h2>
                    {/* <Seller product={card} /> */}
                            {/* {

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

                            } */}
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
