// import { useState, useEffect } from 'react'
import useModalContext from './contexthooks/useModalContext'

const useModal = () => {

    const {
        dispatch,
        initialState
    } = useModalContext();

    const handleSetModal = (type, content) => {
        dispatch({
            type: 'set-modal',
            payload: {
                type: type,
                content: content
            }
        })
    }

    const handleModalImageUris = (uris) => {
        dispatch({
            type: 'set-uris',
            payload: uris
        })
    }

    const handleOpenModal = (bool) => {
        dispatch({
            type: 'open',
            payload: bool
        })
    }

    // const handleModalContent = (content) => {
    //     dispatch({
    //         type: 'set-content',
    //         content: content
    //     })
    // }

    const handleClearModal = () => {
        dispatch({
            type: 'clear-modal',
            payload: initialState
        })
    }

    return {
        handleSetModal,
        handleOpenModal,
        handleModalImageUris,
        // handleModalContent,
        handleClearModal
    }
}

export default useModal
