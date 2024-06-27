import useModalContext from '../../../hooks/contexthooks/useModalContext';
import { IoCloseOutline } from "react-icons/io5";

const CloseBtn = () => {
    const { handleClearModal } = useModalContext();
    return (
        <button
            id='close-modal'
            className='modal-btn close-modal-btn'
            type='button'
            // Close modal reducer function resets open, content and props
            onClick={() => {
                handleClearModal()
            }}
        >
            <IoCloseOutline />
        </button>
    )
}

export default CloseBtn;