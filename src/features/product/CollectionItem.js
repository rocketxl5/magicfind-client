import { useRef } from 'react';
import Drop from '../../components/Drop';
import ImageNew from '../../components/ImageNew';
import Card from '../../components/Card';
import { FaCommentsDollar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { IoExpand } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import useExpandImage from '../../hooks/useExpandImage';
import data from '../../data/SEARCH.json';

import timestampConverter from '../../assets/utilities/timestampConverter';

const CollectionItem = ({ index, product, count, handleCollectionItem, handleSlideView }) => {
    const { longDate } = timestampConverter;

    const { expandedImage } = useExpandImage(product);
    const cardRef = useRef(null);

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
            value: `$ ${product._price}`
        },
        {
            title: 'Quantity:',
            value: product._quantity
        },
        {
            title: 'Comment:',
            value: product._comment ? 'Yes' : 'None'
        }
    ];

    const turnCard = () => {
        cardRef.current?.classList.toggle('rotate-y-180');
    }

    return (
        <>
            {/* <div className='product-view'> */}
            <Card classList="product-container">
                    <div className="slide">
                        <div className="double-faced-card" ref={cardRef}>
                            <div className="card-front">
                                <ImageNew
                                    product={product}
                                    classList='product-image'
                                >
                                    {
                                        (product.finishes[0] === 'foil') &&
                                        <div className="product-finish">
                                            <span className='foil'>{data.product.finishes[product.finishes]}</span>
                                        </div>
                                    }
                                    <Drop
                                        id={'expand-image'}
                                        classList={'drop-bottom-rightabsolute color-light bg-primary border-light-2'}
                                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                                    >
                                        <IoExpand />
                                    </Drop>
                                    {
                                        product._is_published &&
                                        <Drop
                                            id={'instore-product'}
                                                classList={'drop-top-right absolute color-light bg-success border-light-2'}
                                        >
                                            <FaCommentsDollar />
                                        </Drop>
                                    }
                                </ImageNew>
                            </div>
                            <div className="card-back">
                            <div className='product-details'>
                                    <div>
                                        <h2 className='text-center fs-150 fw-500 padding-bottom-dot-5'>Card Info</h2>
                                    </div>
                                    <table>
                                        <tbody>

                                            {
                                                details &&
                                                details.map((detail, i) => {
                                                    return (
                                                        <tr key={i} className='product-spec'>
                                                            <td className='spec-title col-4'>{detail.title}</td>
                                                            <td className={`spec-value col-8 ${detail.classList ? detail.classList : ''}`}>{detail.value}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-legend absolute flex column space gap-2 justify-center">
                        <Drop
                            id={'info-product'}
                            classList={'color-light bg-primary border-primary'}
                            handleClick={(e) => turnCard(cardRef.current)}
                        >
                            <AiOutlineInfoCircle />
                        </Drop>
                        <Drop
                            id={'edit-product'}
                            classList={'color-light bg-success border-success'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <AiOutlineEdit />
                        </Drop>
                        <Drop
                            id={'delete-product'}
                            classList={'color-light bg-danger border-danger'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <AiOutlineDelete />
                        </Drop>
                    </div>
            </Card >
            {/* </div > */}
            <div className="product-name-wrapper flex column">
                <span className="product-name">
                    {
                        product.name.length < 35 ?
                            product.name :
                            `${product.name.substring(0, 30)}...`
                    }
                </span>
                <span className="product-edition">
                    {
                        product.set_name
                    }
                </span>
            </div>
            <span className='product-count'>{index + 1} of {count}</span>
        </>
    )
}


export default CollectionItem