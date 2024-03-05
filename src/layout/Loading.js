import { ImSpinner2 } from "react-icons/im";

const Loading = ({ classList = '' }) => {
    return (
        <div className={`loading-icon ${classList}`}>
            <ImSpinner2 />
        </div>
    );
}

export default Loading;
