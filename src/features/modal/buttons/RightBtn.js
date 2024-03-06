import { FaChevronRight } from "react-icons/fa6";

const RightBtn = ({ classList = '', name, handleClick }) => {
    return (
        <button className={classList} name={name} type="button" onClick={(e) => handleClick(e)}>
            <FaChevronRight />
        </button>
    )
}

export default RightBtn;
