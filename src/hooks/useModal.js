import { useEffect } from 'react';
import Slide from '../features/modal/components/Slide';
import useModalForm from './useModalForm';
import useModalSlideShow from './useModalSlideShow';
import useModalContext from './contexthooks/useModalContext';

const useModal = () => {
    const { content, open, props, handleOpenModal, setModalContent } = useModalContext()

    const { setModalForm } = useModalForm();
    const { setModalSlideShow } = useModalSlideShow();

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
        // console.log(content)
        // Open modal if content is set
        if (content) {
            handleOpenModal(true);
        }
    }, [content])

    return { open, content }
}

export default useModal
