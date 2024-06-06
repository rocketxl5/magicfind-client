import { useEffect, useRef } from 'react';
import BackSide from './components/BackSide';
import FrontSide from './components/FrontSide';
import Card from '../../components/Card';
import Controls from './components/Controls';
import Count from './components/Count';
import Image from '../../components/Image';
import Table from '../../components/Table';
import Tag from './components/Tag';
import TwoSidedSlide from '../modal/components/TwoSidedSlide';
import { AiOutlineDelete } from "react-icons/ai";
import { GoStack } from "react-icons/go";
import { AiOutlineDollar } from "react-icons/ai";
import { IoExpand } from "react-icons/io5";
import { Flip } from './components/icons/Flip';
// import { Rotate } from './components/icons/Rotate';
import useExpandImage from '../../hooks/useExpandImage';
import useTable from '../../hooks/useTable';
import { timestampConverter } from '../../assets/utilities/timestampConverter';
import { flipCard } from './services/flipCard';

const CollectionItem = ({ index, product, count, handleCollectionItem, handleSlideView }) => {
    const cardRef = useRef(null);
    const frontSideRef = useRef(null);
    const buttonRef = useRef(null);

    const { longDate } = timestampConverter;
    const { expandedImage } = useExpandImage(product);
    const { rows, setTable } = useTable()

    useEffect(() => {
        setTable({ type: 'collection', product })
    }, []);

    return (
        <Card
            classList={"product-container"}
            header={<Count unit={index + 1} total={count} />}
            footer={[product.name, product.set_name]}
        >
                <TwoSidedSlide card={cardRef} front={frontSideRef}>
                    <FrontSide>
                        <Image product={product} />
                    {/* {
                            (product.finish.toLowerCase() === 'foil') &&
                            <Tag classList={'card-finish'} content={<span>{product.finish}</span>} />
                        } */}

                    </FrontSide>
                    <BackSide classList={'product-info'}>
                        {
                            rows &&
                            <Table classList={'product-info'} rows={rows} title={'Status'} />
                        }
                    </BackSide>
                    <Controls
                        type={'collection'}
                        buttons={[
                            {
                                id: 'add-to-store',
                                classList: 'control-btn success fs-200',
                                title: 'Add to store',
                                value: <AiOutlineDollar />,
                                clickHandler: (e) => handleCollectionItem(e, product, expandedImage)
                            },
                            {
                                id: 'add-to-deck',
                                classList: 'control-btn primary',
                                title: 'Add to deck',
                                value: <GoStack />,
                                clickHandler: (e) => handleCollectionItem(e, product, expandedImage)
                            },
                            {
                                id: 'delete-product',
                                classList: 'control-btn danger',
                                title: 'Delete product',
                                value: <AiOutlineDelete />,
                                clickHandler: (e) => handleCollectionItem(e, product, expandedImage)
                            },
                            {
                                id: 'expand-image',
                                classList: 'control-btn dark',
                                title: 'Expand image',
                                value: <IoExpand />,
                                clickHandler: (e) => handleSlideView(e, product.layout, expandedImage)
                            },
                            {
                                id: 'flip-btn',
                                classList: 'control-btn flip-btn eclipse',
                                title: 'Flip card',
                                value: <Flip />,
                                clickHandler: () => flipCard({ card: cardRef, front: frontSideRef, button: buttonRef }),
                                ref: buttonRef
                            },
                        ]}
                    />
            </TwoSidedSlide>
        </Card >
    )
}


export default CollectionItem