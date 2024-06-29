import { TfiAngleLeft } from "react-icons/tfi";

const LeftBtn = ({ type, handleClick }) => {
    const style = {
        modal: 'modal-btn slide-left',
        media: 'media-btn snap-left'
    }

    const name = {
        modal: 'slide-left',
        media: 'snap-left'
    }

    return (
        <button name={name[type]} className={style[type]} type="button" onClick={(e) => handleClick(e)}>
            <TfiAngleLeft />
        </button>
    )
}

export default LeftBtn;
