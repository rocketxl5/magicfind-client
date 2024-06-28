import { useEffect, useReducer, createContext } from 'react';
import useLoadImage from '../hooks/useLoadImage';
import { modalReducer } from '../features/modal/services/modalReducer';

const initialState = {
    content: null,
    open: false,
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

    const { images, preloadImages } = useLoadImage();

    useEffect(() => {
        if (modal) {
            const { data } = modal;
            preloadImages(data)
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