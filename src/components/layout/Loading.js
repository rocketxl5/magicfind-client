import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
    // className="flex flex-column align-center justify-center height-fit-content"
    return (
        <div className="loading-container">
            <div className="loadin-content">
            <ImSpinner2 className="loading-icon" />
                <p>Processing...</p>
            </div>
        </div>
    );
}

export default Loading;
