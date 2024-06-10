import { useState, useEffect } from 'react'
import useModal from './contexthooks/useModal'

const useShowModal = () => {
    const [modal, setModal] = useState({ type: '', content: undefined })
    const { setOpen } = useModal();

    useEffect(() => {
        const { type, content } = modal;

        if (type && content) {
            console.log('type', type)
            console.log('content', content)
        }
    }, [modal])

    return { setModal }
}

export default useShowModal
