import { FaExpand } from "react-icons/fa";
import { IoIosExpand } from "react-icons/io";
import { IoExpand } from "react-icons/io5";
const ExpandImgBtn = ({ handleClick, cardLayout, expandedImage }) => {

    return (
        <button className="expand-btn bg-primary" type="button" onClick={(e) => handleClick(e, cardLayout, expandedImage)}>
            <IoExpand />
        </button>
    )
}

export default ExpandImgBtn
