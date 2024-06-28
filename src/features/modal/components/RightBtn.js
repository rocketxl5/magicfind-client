import { TfiAngleRight } from "react-icons/tfi";

const RightBtn = ({ type, handleClick }) => {

    const style = {
        modal: 'modal-btn slide-right',
        media: 'media-btn snap-right'
    }

    const name = {
        modal: 'slide-right',
        media: 'snap-right'
    }

    return (
        <button name={name[type]} className={style[type]} type="button" onClick={(e) => handleClick(e)}>
            <TfiAngleRight />
        </button>
    )
}

export default RightBtn;
