import { IoExpand } from "react-icons/io5";

const ExpandImgBtn = (props) => {
    const { handleSlideView, layout, image } = props;
    return (

        <button className="expand-btn color-light bg-primary border-light absolute flex align-center justify-center b-radius-50 drop-btn" type="button" onClick={(e) => handleSlideView(e, layout, image)}>
            <IoExpand />
        </button>
    )
}

export default ExpandImgBtn
