import { RxCaretRight } from "react-icons/rx";

const RightBtn = ({ style, name, handleClick }) => {
    return (
        <button className={style} name={name} type="button" onClick={(e) => handleClick(e)}>
            <RxCaretRight size={25} />
        </button>
    )
}

export default RightBtn;
