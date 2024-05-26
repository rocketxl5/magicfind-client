import { useState, useEffect } from 'react';
import Loader from '../../layout/Loader';
import Button from '../../components/Button';
import Card from '../../components/Card';
import TwoSidedSlide from '../modal/components/TwoSidedSlide';
import Image from '../../components/Image';
import useExpandImage from '../../hooks/useExpandImage';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import useFind from '../../hooks/useFind';
import setProductName from './services/setProductName';
import useField from '../../hooks/useField';
import { api } from '../../api/resources';
import trimProduct from './services/trimProduct';
import { IoExpand } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import data from '../../data/SEARCH.json';

const ArchiveItem = ({ index, product, count, handleSlideView }) => {
    const [loading, setLoading] = useState(false);
    const [isCardAdded, setIsCardAdded] = useState(false);
    const { auth } = useAuth();
    const { user, token } = auth;
    const { fetch, patch, post, response, error } = useAxios();
    const { fields, setFieldType } = useField;
    const { setUpdateCollection } = useSearch();
    const { expandedImage } = useExpandImage(product);
    const { findMatch, isMatchFound } = useFind();

    useEffect(() => {
        findMatch(product);
        // setFieldType('archive')
    }, []);

    const handleClick = (e) => {
        const query = `${api.serverURL}/api/cards/product/${product.oracle_id}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }
        setLoading(true);

        fetch(query, config);
    }

    const handleGetResponse = (response, product) => {
        const { isSet } = response;
        // If product does not exist
        if (!isSet) {
            // Add it to site cards library
            post(
                token,
                '/api/cards/add/product',
                trimProduct(product, 'cards')
            );
        }
        else {
            // Add returned product from fetch to current user's collection
            const { product } = response;
            patch(
                token,
                `/api/users/${user.id}/add/card`,
                trimProduct(product, 'users')
            );
        }
    }

    const handlePostResponse = (response) => {
        const { isSet, product } = response;

        if (isSet) {
            patch(
                token,
                `/api/users/${user.id}/add/card`,
                trimProduct(product, 'users')
            );
        }
    }

    const handlePatchResponse = (response) => {
        const { isSet, product } = response;
        if (isSet) {
            patch(
                token,
                `/api/cards/modify/${product._id}`,
                user
            );
        }
    }

    const handleUpdate = (response) => {
        const { isSet } = response;

        if (isSet) {
            setLoading(false);
            setIsCardAdded(true);
            setUpdateCollection(true);
        }
    }

    useEffect(() => {
        if (response) {
            switch (response.method) {
                case 'get':
                    handleGetResponse(response, product)
                    break;
                case 'post':
                    handlePostResponse(response)
                    break;
                case 'patch':
                    handlePatchResponse(response)
                    break;
                default:
                    handleUpdate(response)
            }
        }
    }, [response, product]);

    useEffect(() => {
        if (error) {
            setLoading(false);
        }
    }, [error])

    return (
        <Card classList={"product-container"}>
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
                        (product.finishes[0] === 'foil') &&
                        <div className="product-finish">
                            <span className='foil'>{data.product.finishes[product.finishes]}</span>
                        </div>
                    }
                    <Button
                        id={'expand-image'}
                        classList={'product-btn absolute btn-center-right box-size-8 border-light-2 color-light bg-alpha b-radius-5'}
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
                                    handleClick={handleClick}>
                                    <FaPlus />
                                </Button>
                    }
                </Image>
                <div className='product-details'>
                    <section>
                        <div>
                            <h2 className='text-center fs-150 fw-500'>Card Info</h2>
                        </div>
                        <div className='b-radius-5 border-surface-thin'>
                            <table>
                                <tbody>
                                    {
                                        fields &&
                                        fields.map((field, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='spec-title col-3'>{field.title}</td>
                                                    <td className={`spec-value col-8 ${field.classList ? field.classList : ''}`}>{field.value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section>
                    </section>
                </div>
            </TwoSidedSlide>
            <span className='product-count'>{index + 1} of {count}</span>
            <div className="col-12 relative flex column justify-center align-center gap-1">
                <div>
                    {
                        !product.name.includes('//') ? product.name : setProductName(product).name
                    }
                </div>

                <div>
                    {
                        product.set_name
                    }
                </div>

            </div>
        </Card>
    )
}

export default ArchiveItem
