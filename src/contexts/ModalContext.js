import { useEffect, useReducer, createContext } from 'react';
import { modalReducer } from '../features/modal/services/modalReducer';
import usePreloadImage from '../hooks/usePreloadImage';

const initialState = {
    content: null,
    images: null,
    layouts: null,
    open: false,
    props: null,
    uris: null
}

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, initialState);
    const {
        content,
        images,
        layouts,
        open,
        props,
        uris
    } = state || {};

    const { preloaded, preloadImages } = usePreloadImage();

    useEffect(() => {
        if (uris) {
            preloadImages(uris)
        }
    }, [uris])

    useEffect(() => {
        if (preloaded) {
            handleModalImage(preloaded);
        }
    }, [preloaded])

    useEffect(() => {
        console.log('clearing modal')
        handleClearModal();
    }, []);

    function handleOpenModal(open) {
        dispatch({
            type: 'open-modal',
            payload: open
        })
    }

    function handleCloseModal(close) {
        dispatch({
            type: 'close-modal',
            payload: close
        })
    }

    function handleClearModal() {
        dispatch({
            type: 'clear-modal',
            payload: initialState
        })
    }

    function handleModalImageUris(uris) {
        dispatch({
            type: 'set-uris',
            payload: uris
        })
    }

    function handleModalImageLayouts(layouts) {
        dispatch({
            type: 'set-layouts',
            payload: layouts
        })
    }

    function handleModalImage(images) {
        dispatch({
            type: 'set-image',
            payload: images
        })
    }

    function handleModalProps(props) {
        // console.log(props)
        dispatch({
            type: 'set-props',
            payload: props
        })
    }
    // form, slide, slide show,
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
                layouts,
                open,
                props,
                uris,
                handleClearModal,
                handleCloseModal,
                handleModalContent,
                handleModalProps,
                handleModalImage,
                handleModalImageLayouts,
                handleModalImageUris,
                handleOpenModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
