import { IoExpand } from "react-icons/io5";

const ExpandImgBtn = ({ handleClick, layout, image }) => {

    return (
        <button className="expand-btn absolute color-light bg-primary border-light flex align-center justify-center b-radius-50 drop-btn"
            type="button"
            onClick={(e) => handleClick(e, layout, image)}
        >
            <IoExpand />
        </button>
    )
}

export default ExpandImgBtn
