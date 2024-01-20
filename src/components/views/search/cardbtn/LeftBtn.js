import { RxCaretLeft } from "react-icons/rx";

const LeftBtn = ({ style, name, handleClick }) => {
    return (
        <button className={style} name={name} type="button" onClick={(e) => handleClick(e)}>
            <RxCaretLeft size={25} />
        </button>
    )
}

export default LeftBtn;
