import { FaXmark } from "react-icons/fa6";

const CloseBtn = ({ classList, name, handleClick }) => {

    return (
        <button className={classList} name={name} type="button" onClick={(e) => handleClick(e)}>
            <FaXmark />
        </button>
    )
}

export default CloseBtn;