import { useEffect, useRef } from 'react';
import BackSide from './components/BackSide';
import Card from '../../components/Card';
import Controls from './components/Controls';
import Count from './components/Count';
import FrontSide from './components/FrontSide';
import Image from '../../components/Image';
import Loader from '../../layout/Loader';
import Table from '../../components/Table';
import Tag from './components/Tag';
import TwoSidedSlide from '../modal/components/TwoSidedSlide';
import useResponseHandler from '../../hooks/useResponseHandler';
import useAuth from '../../hooks/contexthooks/useAuth';
import useExpandImage from '../../hooks/useExpandImage';
import useFind from '../../hooks/useFind';
import useTable from '../../hooks/useTable';
import { IoExpand } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Flip } from './components/icons/Flip';
import { sanitizeName } from './services/sanitizeName';
import { flipCard } from './services/flipCard';

const ArchiveItem = ({ index, product, count, handleSlideView }) => {
    // Custom hooks
    const {
        handleGetResponse,
        handlePatchResponse,
        handlePostResponse,
        handleUpdate,
        handleFetch,
        loading,
        response,
        error,
        isAdded,
    } = useResponseHandler();

    const { expandedImage } = useExpandImage(product);
    const { findMatch, isMatchFound } = useFind();
    const { rows, setTable } = useTable();
    const { auth } = useAuth();

    const cardRef = useRef(null);
    const frontSideRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        console.log(product)
        findMatch(product.card_id);
        setTable({ type: 'archive', product });
    }, [])

    useEffect(() => {
        if (response) {
            console.log(response)
            switch (response.method) {
                case 'get':
                    handleGetResponse(response, product, auth)
                    break;
                case 'post':
                    handlePostResponse(response, auth)
                    break;
                case 'patch':
                    handlePatchResponse(response, auth)
                    break;
                default:
                    handleUpdate(response)
            }
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            console.log(error.message)
        }
    }, [error])

    return (
        <Card
            classList={"product-container"}
            header={<Count unit={index + 1} total={count} />}
            footer={[sanitizeName(product.name), product.set_name]}
        >
            <TwoSidedSlide card={cardRef} front={frontSideRef}>
                <FrontSide>
                    <Image product={product} />
                    {
                        (product.finish.toLowerCase() === 'foil') &&
                        <Tag classList={'card-finish'} content={<span>{product.finish}</span>} />
                    }
                </FrontSide>
                <BackSide classList={'product-info'}>

                    {
                        rows &&
                        <Table rows={rows} title={'Card Info'} />
                    }
                </BackSide>
                <Controls
                    type={'archive'}
                    loading={loading}
                    buttons={[
                        loading ?
                            {
                                id: 'loader',
                                classList: 'control-btn color-light primary disabled',
                                title: 'Add to store',
                                value: <Loader classList={'relative b-radius-5'} />,
                                clickHandler: null
                            } :
                            isMatchFound || isAdded ?
                                {
                                    id: 'check',
                                    classList: 'control-btn success disabled',
                                    title: 'Add to store',
                                    value: <FaCheck />,
                                    clickHandler: null
                                } :
                                {
                                    id: 'add-to-collection',
                                    classList: 'control-btn primary',
                                    title: 'Add to store',
                                    value: <FaPlus />,
                                    clickHandler: () => handleFetch(product.card_id, auth.token)
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
        </Card>
    )
}

export default ArchiveItem
