import { TfiAngleLeft } from "react-icons/tfi";

const LeftBtn = ({ handleClick }) => {
    return (
        <button name='slide-left' className='modal-btn slide-left' type="button" onClick={(e) => handleClick(e)}>
            <TfiAngleLeft />
        </button>
    )
}

export default LeftBtn;
