import { useEffect, useReducer, createContext } from 'react';
import useSearchContext from '../hooks/contexthooks/useSearchContext';
import useLoadImage from '../hooks/useLoadImage';
import { modalReducer } from '../features/modal/services/modalReducer';

const initialState = {
    content: null,
    // images: null,
    layouts: null,
    open: false,
    props: null,
    modal: null
}

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, initialState);
    const {
        content,
        open,
        modal
    } = state || {};

    const { images, featureImages, preloadImages, preloadFeatureImages } = useLoadImage();

    useEffect(() => {
        if (modal) {
            console.log(modal)
            const { type, data } = modal;
            if (type === 'feature') {

                const uris = data.map(res => res
                    .map(obj => obj.card_faces ?
                        obj.card_faces
                            .map(face => face.image_uris.normal) :
                        obj.image_uris.normal))
                preloadFeatureImages(uris);
            }
            else {

                // console.log(uris)
                preloadImages(data)
            }
        }
    }, [modal]);


    function handleOpenModal() {
        dispatch({
            type: 'open-modal'
        })
    }

    function handleSetModal(modal) {
        dispatch({
            type: 'set-modal',
            payload: modal
        })
    }

    function handleClearModal() {
        dispatch({
            type: 'clear-modal',
            payload: initialState
        })
    }

    // // form, slide, slide show,
    function handleModalContent(content) {
        dispatch({
            type: 'set-content',
            payload: content
        })
    }
    return (
        <ModalContext.Provider
            value={{
                content,
                images,
                featureImages,
                open,
                modal,
                dispatch,
                initialState,
                handleClearModal,
                handleModalContent,
                handleSetModal,
                handleOpenModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}