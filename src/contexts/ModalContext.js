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
    const [layouts, setLayouts] = useState(null);
    const [state, dispatch] = useReducer(modalReducer, initialState);

    const {
        content,
        open,
        props,
    } = state || {}

    const { loadImages, images } = useLoadImages();

    useEffect(() => {
        if (uris) {
            // console.log(uris)
            loadImages(uris);
        }
    }, [uris]);


    useEffect(() => {
        if (layouts) {
            // console.log(layouts)
        }
    }, [layouts])

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
    // form, slide, slide show,
    function handleContentType(contentType) {
        dispatch({
            type: 'content-type',
            payload: contentType
        })
    }

    function handleModalContent(content) {
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
                layouts, 
                setUris, 
                setLayouts,
                handleModalContent,
                handleClearModal,
                handleContentType,
                handleModalProps,
                handleOpenModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
