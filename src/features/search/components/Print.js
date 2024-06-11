import { useEffect, useRef } from 'react';
import Finish from './Finish';
import Image from '../../../components/Image';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useFind from '../../../hooks/useFind';
import useResponseHandler from '../../../hooks/useResponseHandler';

const Print = ({ print, ModalImage }) => {
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
    // console.log(ModalImage)

    const { auth } = useAuth();

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
            <Image classList={'print-image'} src={print.image_uris?.small || print.card_faces[0].image_uris?.small} />
            <div className='col-9 flex'>
                {
                    print.finishes.map((finish, i) => {
                        return <Finish key={i} />
                    })
                }
            </div>

        </div>
    )
}

export default Print
