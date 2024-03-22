import { FaExpand } from "react-icons/fa";

const ExpandImgBtn = ({ handleClick, cardLayout, expandedImage }) => {

    return (
        <button className="expand-btn" type="button" onClick={(e) => handleClick(e, cardLayout, expandedImage)}>
            <FaExpand />
        </button>
    )
}

export default ExpandImgBtn
