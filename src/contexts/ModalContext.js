import { useEffect, useReducer, createContext } from 'react';
import useLoadImages from '../hooks/useLoadImages';
import { modalReducer } from '../features/modal/services/modalReducer';

const initialState = {
    content: null,
    open: false,
    type: '',
    uris: null
}

// Modal type: slide, carrousel, form


export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(modalReducer, initialState);

    const {
        content,
        open,
        type,
        uris,
    } = state || {}

    const { loadImages, images } = useLoadImages();

    useEffect(() => {
        if (uris) {
            loadImages(uris);
        }
    }, [uris])


    return (
        <ModalContext.Provider
            value={{
                content,
                open,
                type,
                uris,
                dispatch,
                initialState
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
