import { RxCaretLeft } from "react-icons/rx";

const LeftBtn = ({ style, handleClick }) => {
    return (
        <button className={style} name="left-btn" type="button" onClick={(e) => handleClick(e)}>
            <RxCaretLeft size={25} />
        </button>
    )
}

export default LeftBtn;
