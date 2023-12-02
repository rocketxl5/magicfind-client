// import { TbRotate360 } from "react-icons/tb";
import { Tb360 } from "react-icons/tb";

const FlipIcon = ({ handleClick }) => {

    return (
        <button id="flip-card" className="card-icon-container flip-icon" onClick={handleClick}>
            <Tb360 />
        </button>
    )


}

export default FlipIcon;
