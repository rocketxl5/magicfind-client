import { RxCaretRight } from "react-icons/rx";

const RightBtn = ({ style, handleClick }) => {
    return (
        <button className={style} name="right-btn" type="button" onClick={(e) => handleClick(e)}>
            <RxCaretRight size={25} />
        </button>
    )
}

export default RightBtn;
