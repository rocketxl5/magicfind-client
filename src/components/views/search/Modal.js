import { createPortal } from 'react-dom';

const Modal = ({ open, children }) => {
    if (!open) {
        document.body.classList.remove('overflow-hidden');
        return null;
    }
    else {
        document.body.classList.add('overflow-hidden');
    }

    return createPortal(
        <div className="overlay">
            {children}
        </div>,
        document.body
    )
}

export default Modal;
