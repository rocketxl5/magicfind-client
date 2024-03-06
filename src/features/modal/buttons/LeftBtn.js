import { FaChevronLeft } from "react-icons/fa6";

const LeftBtn = ({ classList = '', name, handleClick }) => {
    return (
        <button className={classList} name={name} type="button" onClick={(e) => handleClick(e)}>
            <FaChevronLeft />
        </button>
    )
}

export default LeftBtn;
