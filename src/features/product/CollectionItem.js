import Button from '../../components/Button';
import Card from '../../components/Card';
import Count from './components/Count';
import Image from '../../components/Image';
import Tag from './components/Tag';
import TwoSidedSlide from '../modal/components/TwoSidedSlide';
import { FaCommentsDollar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { GoStack } from "react-icons/go";
// import { AiOutlineEdit } from "react-icons/ai";
import { IoExpand } from "react-icons/io5";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import useExpandImage from '../../hooks/useExpandImage';
import data from '../../data/SEARCH.json';

import timestampConverter from '../../assets/utilities/timestampConverter';

const CollectionItem = ({ index, product, count, handleCollectionItem, handleSlideView }) => {
    const { longDate } = timestampConverter;

    const { expandedImage } = useExpandImage(product);
    // console.log(product)
    const details = [
        {
            title: 'Decks:',
            value: product.isDeck ? `Card is in ${product.decks.length} deck(s)` : 'Not assigned to any decks'
        },
        {
            title: 'Store:',
            value: product.inStore ? `Card is in store` : 'Not in store'
        },
    ];

    return (
        <Card
            classList={"product-container"}
            header={<Count unit={index + 1} total={count} />}
            footer={[product.name, product.set_name]}
        >
            <TwoSidedSlide classList={{ container: '', btn: 'card-action-btn b-radius-5 btn-bottom-right' }}>
                <Image
                    product={product}
                    classList='product-image'
                >
                    {
                        (product.finishes[0] === 'foil') &&
                        <div className="card-finish">
                            <span className='foil'>{data.product.finishes[product.finishes]}</span>
                        </div>
                    }
                    <Button
                        id={'expand-image'}
                        classList={'drop-bottom-rightabsolute color-light bg-primary border-light-2'}
                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                    >
                        <IoExpand />
                    </Button>
                    {
                        product._is_published &&
                        <Button
                            id={'instore-product'}
                                classList={'btn-top-right absolute color-light bg-success border-light-2'}
                        >
                            <FaCommentsDollar />
                        </Button>
                    }
                    {/* <Button
                        id={'sell-product'}
                        classList={'card-action-btn btn-bottom-left b-radius-5 btn-bottom-right border-light-3 bg-success'}
                        handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                    >
                        <AiOutlineEdit className='box-size-100 stroke-light fill-light' />
                    </Button>
                    <Button
                        id={'delete-product'}
                        classList={'card-action-btn btn-bottom-center b-radius-5 btn-bottom-right color-light'}
                        handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                    >
                        <AiOutlineDelete className='box-size-100 ' />
                    </Button> */}
                    <div className="product-legend">
                        <Button
                            id={'sell-product'}
                            classList={'drop-btn color-light bg-success border-success'}
                            title={'Sell card'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <FaCommentsDollar />
                        </Button>
                        <Button
                            id={'deck-product'}
                            classList={'drop-btn color-light bg-primary border-primary'}
                            title={'Add to deck'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <GoStack />
                        </Button>
                        <Button
                            id={'delete-product'}
                            classList={'drop-btn color-light bg-danger border-danger'}
                            title={'Delete card'}
                            handleClick={(e) => handleCollectionItem(e, product, expandedImage)}
                        >
                            <AiOutlineDelete />
                        </Button>

                    </div>
                </Image>
                <div className='product-info'>
                    <section>
                        <div>
                            <h2 className='text-center fs-150 fw-500'>Card Info</h2>
                        </div>
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
                        </div>
                    </section>
                </div>
            </TwoSidedSlide>
        </Card >
    )
}


export default CollectionItem