import { createPortal } from 'react-dom';
import CloseBtn from './components/CloseBtn';

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
            <div className='modal'>
                <div className="modal-inner">
                    <CloseBtn />
                </div>
            {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal;
