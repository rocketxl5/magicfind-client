import { createPortal } from 'react-dom';

const Modal = ({ open, children }) => {
    if (!open) {
        document.body.style.overflowY = 'scroll';
        return null;
    }
    else {
        document.body.style.overflowY = 'hidden';
    }

    return createPortal(
        <div className="overlay">
            {children}
        </div>,
        document.body
    )
}

export default Modal;
