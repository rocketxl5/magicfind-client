import { useState, useEffect, useRef } from 'react';
import Finish from './Finish';
import Image from '../../../components/Image';
import useAuthContext from '../../../hooks/contexthooks/useAuthContext';
import useFind from '../../../hooks/useFind';
import useResponseHandler from '../../../hooks/useResponseHandler';
import { formatLayout } from '../../modal/services/formatLayout';

import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Print = ({ print }) => {
    // const [index, setImageIndex] = useState(undefined);
    const [imageLayout, setImageLayout] = useState('');
    const [imageIndex, setImageIndex] = useState(null);

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
    const { uris } = useModalContext();

    useEffect(() => {
        if (uris) {
            setImageLayout(formatLayout(print.layout))
        }
    }, [])

    useEffect(() => {
        if (imageLayout) {
            const index = imageLayout === 'reversible' ?
                uris.findIndex(uri => uri.includes(print.card_faces[0]?.image_uris?.normal)) :
                uris.findIndex(uri => uri === print?.image_uris?.normal);

            setImageIndex(index);
        }
    }, [imageLayout])

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
                    <Image
                        index={imageIndex}
                            // index={uris.findIndex(uri => uri === print.image_uris.normal || uri[print.card_faces[0].image_uris.normal)}
                            src={print.image_uris?.small || print.card_faces[0].image_uris?.small}
                            classList={'image-print'}
                        layout={imageLayout}
                        />
                        <div className='finishes'>
                            {
                                print.finishes.map((finish, i) => {
                                    return <Finish key={i} finish={finish} />
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default Print
