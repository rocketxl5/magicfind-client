import useModalContext from '../../../hooks/contexthooks/useModalContext';
import { TfiClose } from "react-icons/tfi";

const CloseBtn = () => {
    const { handleClearModal } = useModalContext();
    return (
        <button
            id='close-modal'
            className='modal-btn close-modal'
            type='button'
            // Close modal reducer function resets open, content and props
            onClick={() => {
                handleClearModal()
            }}
        >
            <TfiClose />
        </button>
    )
}

export default CloseBtn;