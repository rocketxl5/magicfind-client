import { FaXmark } from "react-icons/fa6";

const CloseBtn = ({ style, name, handleClick }) => {

    return (
        <button className={style} name={name} type="button" onClick={(e) => handleClick(e)}>
            <FaXmark />
        </button>
    )
}

export default CloseBtn;