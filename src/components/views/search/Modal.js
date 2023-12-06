import { createPortal } from 'react-dom';

const Modal = ({ open, children }) => {
    if (!open) return null;

    return createPortal(
        <div className="overlay">
            {children}
        </div>,
        document.body
    )
}

export default Modal
