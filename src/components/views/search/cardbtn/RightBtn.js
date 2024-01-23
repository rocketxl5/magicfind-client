import { FaChevronRight } from "react-icons/fa6";

const RightBtn = ({ style, name, handleClick }) => {
    return (
        <button className={style} name={name} type="button" onClick={(e) => handleClick(e)}>
            <FaChevronRight />
        </button>
    )
}

export default RightBtn;
