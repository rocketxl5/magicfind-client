import { IoClose } from "react-icons/io5";

const CloseBtn = ({ handleClick }) => {
    return (
        <button className="close-btn card-btn" type="button" onClick={(e) => handleClick(e, null)}>
            <IoClose />
        </button>
    )
}

export default CloseBtn;