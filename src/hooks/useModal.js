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
        layouts,
        handleModalContent,
        handleClearModal,
        handleOpenModal,
    } = useModalContext();

    const pathname = useLocation();

    useEffect(() => {
        if (props) {
            const { index, layout, type } = props;
            // console.log(props)
            // console.log(images)
            // console.log(layouts)
            if (images) {
                // console.log(images)
                switch (type) {
                    case 'form':
                        // handleModalContent('form')
                        break;
                    case 'slide':

                        handleModalContent(<Slide image={images[index]} layout={layout} />);
                        break;
                    case 'slide-show': 

                        // handleModalContent(<SlideShow2 images={images[index]} layouts={layouts} />);
                    break;
                    default:
                        break;
                }
            }
        }
    }, [props, images]);

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
