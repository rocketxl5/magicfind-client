import useModalContext from '../../../hooks/contexthooks/useModalContext';
import { FaXmark } from "react-icons/fa6";

const CloseBtn = () => {
    const { handleOpenModal } = useModalContext();
    return (
        <button
            id='close-btn'
            className={`slide-close-btn slide-btn`}
            type="button"
            onClick={() => handleOpenModal(false)}>
            <FaXmark />
        </button>
    )
}

export default CloseBtn;