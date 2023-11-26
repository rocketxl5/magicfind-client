import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
    // className="flex flex-column align-center justify-center height-fit-content"
    return (
        <div className="loading-icon-container">

            <ImSpinner2 className="loading-icon" />
            <p>Loading...</p>
        </div>
    );
}

export default Loading;
