import { FaRegCircle } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";

const Indicator = (props) => {
    const { index, currentIndicator, handleClick } = props;

    return (
        <button
            id={index}
            name='indicator'
            key={index}
            className="indicator"
            onClick={handleClick}>
            {
                currentIndicator === index ?
                    <FaRegCircleDot style={{ fill: 'var(--clr-light)' }} /> :
                    <FaRegCircle />
            }
        </button>
    )
}

export default Indicator
