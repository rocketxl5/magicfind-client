import { IoClose } from "react-icons/io5";

const CloseBtn = ({ style, name, handleClick }) => {

    return (
        <button className={style} name={name} type="button" onClick={(e) => handleClick(e)}>
            <IoClose />
        </button>
    )
}

export default CloseBtn;