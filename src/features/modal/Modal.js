import { createPortal } from 'react-dom';

const Modal = ({ open, children }) => {
    if (!open) {
        // Allow scrollimg
        document.body.classList.remove('scroll-none');
        return null;
    }
    // Prevent scrolling
    document.body.classList.add('scroll-none');

    return createPortal(
        <div className='overlay'>
            {children}
        </div>,
        document.body
    )
}

export default Modal;
