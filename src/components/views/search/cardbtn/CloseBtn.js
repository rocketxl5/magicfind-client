import { IoClose } from "react-icons/io5";

const CloseBtn = ({ handleClick, coordinates }) => {
    return (
        <button className={`${coordinates} close-btn card-btn`} type="button" onClick={(e) => handleClick(e, null)}>
            <IoClose />
        </button>
    )
}

export default CloseBtn;