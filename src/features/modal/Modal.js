import { createPortal } from 'react-dom';
import useModalContext from '../../hooks/contexthooks/useModalContext';
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ open, children }) => {
    const { handleClearModal } = useModalContext();

    if (!open) {
        // Allow scrollimg
        document.body.classList.remove('scroll-none');
        return null;
    }
    // Prevent scrolling
    document.body.classList.add('scroll-none');

    return createPortal(
        <div className='overlay'>
            <div className='modal'>
                <button
                    id='close-modal'
                    className='close-modal'
                    type='button'
                    onClick={handleClearModal}
                >
                    <IoCloseOutline />
                </button>
            {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal;
