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
                <div className="modal-inner">
                <button
                    id='close-modal'
                        className='modal-btn close-modal'
                    type='button'
                    onClick={handleClearModal}
                >
                    <IoCloseOutline />
                </button>

                </div>
            {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal;
