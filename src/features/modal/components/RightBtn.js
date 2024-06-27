import { TfiAngleRight } from "react-icons/tfi";

const RightBtn = ({ handleClick }) => {
    return (
        <button name='slide-right' className='modal-btn slide-right' type="button" onClick={(e) => handleClick(e)}>
            <TfiAngleRight />
        </button>
    )
}

export default RightBtn;
