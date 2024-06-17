import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slide from '../features/modal/components/Slide';
import useModalForm from './useModalForm';
import useModalSlideShow from './useModalSlideShow';
import useModalContext from './contexthooks/useModalContext';

const useModal = () => {
    const {
        content,
        open,
        props,
        setModalContent,
        handleClearModal,
        handleOpenModal,
    } = useModalContext()

    const { setModalForm } = useModalForm();
    const { setModalSlideShow } = useModalSlideShow();

    const pathname = useLocation();

    useEffect(() => {
        if (props) {
            const { type, ...rest } = props;
            switch (type) {
                case 'form':
                    setModalForm(rest)
                    break;
                case 'slide':
                    setModalContent(<Slide {...rest} />)
                    break;
                case 'slide-show':
                    setModalSlideShow(rest)
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
