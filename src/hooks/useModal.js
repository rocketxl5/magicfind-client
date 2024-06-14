import { useEffect } from 'react';
import useModalForm from './useModalForm';
import useModalSlide from './useModalSlide';
import useModalSlideShow from './useModalSlideShow';
import useModalContext from './contexthooks/useModalContext';

const useModal = () => {
    const { content, open, props, handleOpenModal } = useModalContext()

    const { setModalForm } = useModalForm();
    const { setModalSlide } = useModalSlide();
    const { setModalSlideShow } = useModalSlideShow();

    useEffect(() => {
        if (props) {
            const { type, ...rest } = props;
            switch (type) {
                case 'form':
                    setModalForm(rest)
                    break;
                case 'slide':
                    setModalSlide(rest)
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
        // console.log(content)
        // Open modal if content is set
        if (content) {
            handleOpenModal(true);
        }
    }, [content])

    return { open, content }
}

export default useModal
