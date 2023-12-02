import { createPortal } from 'react-dom';

const Modal = (props) => {
    const { open, children } = props;
    if (!open) return null;

    return createPortal(
        <div className="overlay">
            {children}
        </div>,
        document.body
    )
}

export default Modal
