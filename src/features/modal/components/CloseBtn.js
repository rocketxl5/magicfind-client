import useModalContext from '../../../hooks/contexthooks/useModalContext';
import { IoCloseOutline } from "react-icons/io5";

const CloseBtn = () => {
    const { handleCloseModal } = useModalContext();
    return (
        <button
            id='close-modal'
            className='modal-btn close-modal'
            type='button'
            // Close modal reducer function resets open, content and props
            onClick={() => handleCloseModal()}
        >
            <IoCloseOutline />
        </button>
    )
}

export default CloseBtn;