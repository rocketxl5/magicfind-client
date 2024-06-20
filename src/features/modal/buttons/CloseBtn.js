import useModalContext from '../../../hooks/contexthooks/useModalContext';
import { FaXmark } from "react-icons/fa6";

const CloseBtn = () => {
    const { handleClearModal } = useModalContext();
    return (
        <button
            id='close-btn'
            className={`slide-close-btn slide-btn-container`}
            type="button"
            onClick={() => handleClearModal()}>
            <FaXmark />
        </button>
    )
}

export default CloseBtn;