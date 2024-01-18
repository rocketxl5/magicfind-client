import { IoClose } from "react-icons/io5";

const CloseBtn = ({ style, handleClick }) => {

    return (
        <button className={style} name="close-btn" type="button" onClick={(e) => handleClick(e)}>
            <IoClose />
        </button>
    )
}

export default CloseBtn;