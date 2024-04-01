import { IoExpand } from "react-icons/io5";

const ExpandImage = ({ handleClick }) => {

    return (
        <button className="drop-bottom absolute color-light bg-primary border-light b-radius-5 drop-btn"
            type="button"
            onClick={handleClick}
        >
            <IoExpand />
        </button>
    )
}

export default ExpandImage
