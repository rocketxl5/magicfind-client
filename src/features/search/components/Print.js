import { useEffect, useRef } from 'react';
import Finish from './Finish';
import Image from '../../../components/Image';
import useAuthContext from '../../../hooks/contexthooks/useAuthContext';
import useFind from '../../../hooks/useFind';
import useResponseHandler from '../../../hooks/useResponseHandler';

const Print = ({ index, print }) => {
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
    return (
        <div className='flex print'>
            <Image classList={'image-print'} src={print.image_uris?.small || print.card_faces[0].image_uris?.small} index={index} />
            <div className='finishes'>
                {
                    print.finishes.map((finish, i) => {
                        return <Finish key={i} finish={finish} />
                    })
                }
            </div>

        </div>
    )
}

export default Print
