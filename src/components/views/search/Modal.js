import { createPortal } from 'react-dom';

const Modal = ({ open, children }) => {
    if (!open) {
        document.body.classList.remove('scroll-none');
        return null;
    }

    document.body.classList.add('scroll-none');

    return createPortal(
        <div className="overlay">
            {children}
        </div>,
        document.body
    )
}

export default Modal;
