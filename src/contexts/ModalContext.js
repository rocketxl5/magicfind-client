import { useEffect, useReducer, createContext } from 'react';
import useLoadImages from '../hooks/useLoadImages';
import { modalReducer } from '../features/modal/services/modalReducer';

const initialState = {
    content: null,
    open: false,
    props: null,
    uris: null
}

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(modalReducer, initialState);

    const {
        content,
        open,
        props,
        uris,
    } = state || {}

    const { loadImages, images } = useLoadImages();

    useEffect(() => {
        if (uris) {
            loadImages(uris);
        }
    }, [uris]);

    function handleModalUris(uris) {
        dispatch({
            type: 'set-uris',
            payload: uris,
        })
    }

    function handleOpenModal(open) {
        dispatch({
            type: 'open-modal',
            payload: open
        })
    }

    function handleModalProps(props) {
        // console.log(props)
        dispatch({
            type: 'set-props',
            payload: props
        })
    }

    function setModalContent(content) {
        dispatch({
            type: 'set-content',
            payload: content
        })
    }

    return (
        <ModalContext.Provider
            value={{
                images,

                content,
                open,
                props,
                uris,

                setModalContent,
                handleModalProps,
                handleModalUris,
                handleOpenModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
