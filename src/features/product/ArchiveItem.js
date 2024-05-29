import { useEffect } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Count from './components/Count';
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
        isCardAdded,
    } = useResponseHandler();
    const { expandedImage } = useExpandImage(product);
    const { findMatch, isMatchFound } = useFind();
    // const { setUpdateCollection } = useSearch();
    const { rows, setTable } = useTable();
    const { auth } = useAuth();

    useEffect(() => {
        findMatch(product);
        setTable({ type: 'archive', product });
    }, []);

    useEffect(() => {
        if (response) {
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
            // setLoading(false);
            console.log(error.message)
        }
    }, [error])

    return (
        <Card
            classList={"product-container"}
            header={<Count unit={index + 1} total={count} />}
            footer={[product.name, product.set_name]}
        >
            <TwoSidedSlide classList={
                {
                    container: '',
                    btn: 'card-action-btn b-radius-5 btn-bottom-right color-light'
                }
            }>
                <Image
                    product={product}
                    classList='product-image'
                >
                    {
                        (product.finish.toLowerCase() === 'foil') &&
                        <Tag classList={'card-finish'} content={<span>{product.finish}</span>} />
                    }
                    <Button
                        id={'expand-image'}
                        classList={'product-btn absolute btn-center-right border-light-2 color-light bg-alpha b-radius-5'}
                        handleClick={(e) => handleSlideView(e, product.layout, expandedImage)}
                    >
                        <IoExpand className='expand-icon' />
                    </Button>
                    {
                        loading ?
                            <Button classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right b-radius-5'} >
                                <Loader classList={'relative color-light bg-alpha'} />
                            </Button>
                            :
                            (isCardAdded || isMatchFound) ?
                                <Button classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right disabled b-radius-5'} disabled={true}>
                                    <FaCheck />
                                </Button>
                                :
                                <Button classList={'product-btn absolute border-light-2 color-light bg-alpha btn-top-right b-radius-5'}
                                    handleClick={handleFetch(product.oracle_id, auth.token)}>
                                    <FaPlus />
                                </Button>
                    }
                </Image>
                {
                    rows &&
                    <Table classList={'product-info'} title={'Card Info'} rows={rows} />
                }
            </TwoSidedSlide>
        </Card>
    )
}

export default ArchiveItem
