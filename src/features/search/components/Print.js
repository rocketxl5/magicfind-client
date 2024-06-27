import { useState, useEffect, useRef } from 'react';
import Finish from './Finish';
import Image from '../../../components/Image';
import useFind from '../../../hooks/useFind';
import useResponseHandler from '../../../hooks/useResponseHandler';
import useAuthContext from '../../../hooks/contexthooks/useAuthContext';
import useModalContext from '../../../hooks/contexthooks/useModalContext';
import { formatLayout } from '../../modal/services/formatLayout';

const Print = ({ print }) => {
    // const [index, setImageIndex] = useState(undefined);
    const [imageLayout, setImageLayout] = useState('');
    const [imageIndex, setImageIndex] = useState(null);
    const [props, setProps] = useState(null)

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

    const { auth } = useAuthContext();

    const { images } = useModalContext();

    useEffect(() => {
        const layout = formatLayout(print.layout);
        if (images) {
            const index = layout === 'reversible' ?
                images.findIndex((image) => image[0]?.props?.src.includes(print.card_faces[0].image_uris.normal)) :
                images.findIndex((image) => image?.props?.src === print.image_uris.normal)

            setProps({ layout: layout, image: images[index] });
        }
    }, [images])

    // const { findMatch, isMatchFound } = useFind();

    // useEffect(() => {
    //     findMatch(print.id);
    // }, [])

    // useEffect(() => {
    //     if (response) {
    //         switch (response.method) {
    //             case 'get':
    //                 handleGetResponse(response, print, auth)
    //                 break;
    //             case 'post':
    //                 handlePostResponse(response, auth)
    //                 break;
    //             case 'patch':
    //                 handlePatchResponse(response, auth)
    //                 break;
    //             default:
    //                 handleUpdate(response)
    //         }
    //     }
    // }, [response]);

    // const setImageIndex = (layout, print) => {
    //     if(layout === 'reversible') {
    //         console.log(object)
    //     }
    //     // console.log(print.)
    //     // index={uris.findIndex(uri => uri === print.image_uris.normal)}

    // }
    return (
        <>
            { 
                <div className='flex print'>
                    {
                        props &&
                        <>
                            <Image
                                classList={'image-print'}
                                image={props.image}
                                layout={props.layout}
                                src={print.image_uris?.small || print.card_faces[0].image_uris?.small}
                            />
                            <div className='finishes'>
                                {
                                    print.finishes.map((finish, i) => {
                                        return <Finish key={i} finish={finish} />
                                    })
                                }
                            </div>
                        </>
                    }
                    </div>
            }
        </>
    )
}

export default Print
