
import { TbRotate360 } from "react-icons/tb";

const ExpandedCardContent = ({ children, handleClick }) => {
    // const { children, handleClick } = props;
    console.log(handleClick)

    return (
        <div className="expanded-card" onClick={handleClick}>
            {children}
        </div>

    )
}

export default ExpandedCardContent;
