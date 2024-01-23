import { FaChevronLeft } from "react-icons/fa6";

const LeftBtn = ({ style, name, handleClick }) => {
    return (
        <button className={style} name={name} type="button" onClick={(e) => handleClick(e)}>
            <FaChevronLeft />
        </button>
    )
}

export default LeftBtn;
