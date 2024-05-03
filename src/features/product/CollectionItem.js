import Drop from '../../components/Drop';
import ImageNew from '../../components/ImageNew';
import Card from '../../components/Card';
import TwoSidedSlide from '../modal/TwoSidedSlide';
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
    console.log(product)

    const details = [
        {
            title: 'Status:',
            value: product._is_published ? 'Published' : 'Unpublished'
        },
        {
            title: 'Published:',
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

    return (
        <Card classList={"product-container"}>
            <TwoSidedSlide classList={{ container: '', btn: 'card-action-btn b-radius-5 btn-bottom-right' }}>
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
                    {/* <Drop
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
                                classList={'btn-top-right absolute color-light bg-success border-light-2'}
                        >
                            <FaCommentsDollar />
                        </Drop>
                    } */}
                    {/* <Drop
                        id={'edit-product'}
                        classList={'card-action-btn btn-bottom-left b-radius-5 btn-bottom-right border-light-3 bg-success'}
                        handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                    >
                        <AiOutlineEdit className='box-size-100 stroke-light fill-light' />
                    </Drop>
                    <Drop
                        id={'delete-product'}
                        classList={'card-action-btn btn-bottom-center b-radius-5 btn-bottom-right color-light'}
                        handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                    >
                        <AiOutlineDelete className='box-size-100 ' />
                    </Drop> */}
                    <div className="product-legend">

                        <Drop
                            id={'edit-product'}
                            classList={'drop-btn color-light bg-success border-success'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <AiOutlineEdit />
                        </Drop>
                        <Drop
                            id={'delete-product'}
                            classList={'drop-btn color-light bg-danger border-danger'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <AiOutlineDelete />
                        </Drop>

                    </div>
                </ImageNew>
                <div className='product-details'>
                    <section>
                        <div>
                            <h2 className='text-center fs-150 fw-500'>Card Info</h2>
                        </div>
                        {
                            product._is_published ?
                        <div className='b-radius-5 border-surface-thin'>
                            <table>
                                <tbody>
                                            {
                                        details.map((detail, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='spec-title col-3'>{detail.title}</td>
                                                    <td className={`spec-value col-8 ${detail.classList ? detail.classList : ''}`}>{detail.value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                                </div> :
                                <div>
                                    This card is currently unpublished
                        </div>
                        }
                    </section>
                </div>
            </TwoSidedSlide>
            <span className='product-count'>{index + 1} of {count}</span>
            <div className="col-12 relative flex column justify-center align-center gap-1">
                <div>
                    {
                        product.name
                    }
                </div>

                <div>
                    {
                        product.set_name
                    }
                </div>

            </div>
        </Card >
    )
}


export default CollectionItem