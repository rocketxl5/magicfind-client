import { IoExpand } from "react-icons/io5";

const ExpandImage = ({ handleClick }) => {

    return (
        <button className="drop-bottom-rightabsolute color-light bg-primary border-light-2 b-radius-5 product-btn"
            type="button"
            onClick={handleClick}
        >
            <IoExpand />
        </button>
    )
}

export default ExpandImage
