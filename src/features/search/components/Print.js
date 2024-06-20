import { useState, useEffect, useRef } from 'react';
import Finish from './Finish';
import Image from '../../../components/Image';
import useAuthContext from '../../../hooks/contexthooks/useAuthContext';
import useFind from '../../../hooks/useFind';
import useResponseHandler from '../../../hooks/useResponseHandler';
import useCardLayout from '../../../hooks/useCardLayout';

import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Print = ({ print }) => {
// const [index, setIndex] = useState(undefined);
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

    const { layout, setCardLayout } = useCardLayout();

    useEffect(() => {
        setCardLayout(print.layout)
    }, [])

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

    // const setIndex = (layout, print) => {
    //     if(layout === 'reversible') {
    //         console.log(object)
    //     }
    //     // console.log(print.)
    //     // index={uris.findIndex(uri => uri === print.image_uris.normal)}

    // }
    // useEffect(() => {
    //     console.log(layout)
    //     if (layout === 'reversible') {
    //         const i = uris.findIndex(uri => uri.includes(print.card_faces[0].image_uris?.normal))
    //         console.log(i)
    //         setIndex(i)
    //         // setSlideIndex(uris.findIndex(uri => uri.includes(print.card_faces[0].image_uris?.normal)));
    //     }
    //     else {
    //         const i = uris.findIndex(uri => uri === print.image_uris?.normal)
    //         console.log(i)
    //         setIndex(i)
    //     }
    //     // else {
    //     //     setSlideIndex(uris.findIndex(uri => uri === print.image_uris?.normal))
    //     // }
    // }, [layout])


    const setIndex = (layout, print) => {
        // console.log(uris)
        if (layout === 'reversible') {
            // console.log(uris)
            const i = uris.findIndex(uri => uri.includes(print.card_faces[0]?.image_uris?.normal))
            // console.log(i)
            // setIndex(i)
            // setSlideIndex(uris.findIndex(uri => uri.includes(print.card_faces[0].image_uris?.normal)));
            return i;
        }
        else {
            const i = uris.findIndex(uri => uri === print?.image_uris?.normal)
            // console.log(i)
            // setIndex(i)
            return i;
        }
    }
    return (
        <>
            {
                layout &&
                <div className='flex print'>
                    <Image
                            index={setIndex(layout, print)}
                            // index={uris.findIndex(uri => uri === print.image_uris.normal || uri[print.card_faces[0].image_uris.normal)}
                            src={print.image_uris?.small || print.card_faces[0].image_uris?.small}
                            classList={'image-print'}
                            layout={layout}
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
