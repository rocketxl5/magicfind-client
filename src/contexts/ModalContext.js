import { useEffect, useState, useReducer, createContext } from 'react';
import useLoadImages from '../hooks/useLoadImages';
import { modalReducer } from '../features/modal/services/modalReducer';

const initialState = {
    content: null,
    open: false,
    props: null,
}

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [uris, setUris] = useState(null);
    const [state, dispatch] = useReducer(modalReducer, initialState);

    const {
        content,
        open,
        props,
    } = state || {}

    const { loadImages, images } = useLoadImages();

    useEffect(() => {
        if (uris) {
            loadImages(uris);
        }
    }, [uris]);

    function handleOpenModal(open) {
        dispatch({
            type: 'open-modal',
            payload: open
        })
    }

    function handleClearModal() {
        dispatch({
            type: 'clear-modal',
            payload: initialState
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
                setUris, 
                setModalContent,
                handleClearModal,
                handleModalProps,
                handleOpenModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
