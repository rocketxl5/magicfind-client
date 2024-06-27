import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slide from '../features/modal/components/Slide';
import SlideFrame from '../features/modal/components/SlideFrame';
import SlideShow2 from '../features/modal/components/SlideShow2';
import useModalContext from './contexthooks/useModalContext';
import useSearchContext from './contexthooks/useSearchContext';

const useModal = () => {
    const [showModal, setShowModal] = useState(null);

    const { images } = useSearchContext();
    const {
        content, 
        modal,
        handleModalContent, 
        handleClearModal,
        handleOpenModal,
    } = useModalContext();

    const { pathname } = useLocation();

    useEffect(() => {
        if (showModal) {
            // slide // slide-show // form
            const { type, ...rest } = showModal;
            switch (type) {
                case 'slide':
                    return handleModalContent(
                        <>
                            <SlideFrame />
                            <Slide {...rest} />
                        </>
                    );
                case 'slide-show':
                    return handleModalContent(
                        <SlideShow2 images={rest} />
                    )
                case 'feature':
                    return console.log(type)
                default:
                    break;
            }
        }
    }, [showModal])

    useEffect(() => {
        if (content) {
            handleOpenModal()
        }
    }, [content]);

    useEffect(() => {
        // if modal and modal is set
        if (pathname && modal) {
            // clear modal
            handleClearModal();
        }
    }, [pathname]);

    return { images, setShowModal }
}

export default useModal
