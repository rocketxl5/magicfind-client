import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slide from '../features/modal/components/Slide';
import SlideShow2 from '../features/modal/components/SlideShow2';
import useModalForm from './useModalForm';
import useSlideShow from './useSlideShow';
import useModalContext from './contexthooks/useModalContext';

const useModal = () => {
    const {
        content,
        open,
        props,
        images,
        handleModalContent,
        handleClearModal,
        handleOpenModal,
    } = useModalContext();

    const { setModalForm } = useModalForm();
    const { setModalSlideShow } = useSlideShow();

    const pathname = useLocation();

    useEffect(() => {
        if (props) {
            const { type, index, layout } = props;
            switch (type) {
                case 'form':
                    setModalForm();
                    break;
                case 'slide':
                    handleModalContent(<Slide image={images[index]} layout={layout} />);
                    break;
                case 'slide-show':
                    setModalSlideShow(<SlideShow2 />);
                    break;
                default:
                    break;
            }
        }
    }, [props]);

    useEffect(() => {
        // If modal is open and pathname changes 
        // [click event on browser's back or forward arrows]
        if (pathname && open) {
            // Close modal
            handleClearModal();
        }
    }, [pathname])

    useEffect(() => {
        // console.log(content)
        // Open modal if content is set
        if (content) {
            handleOpenModal(true);
        }
    }, [content])

    return { open, content }
}

export default useModal
