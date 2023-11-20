import spinner from './spinner.gif';

const Loading = () => {

    return (
        <div className="flex flex-column align-center">
            <img
                className="loading"
                src={spinner}
                alt="Spinner"
            />
        </div>
    );
}

export default Loading;
