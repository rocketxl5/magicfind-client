import { createContext, useState, useEffect, useReducer } from 'react';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);

    return (
        <ModalContext.Provider
            value={{
                content,
                setContent,
                open,
                setOpen,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
