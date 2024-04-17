import useSearch from '../../../hooks/contexthooks/useSearch';

const Prediction = (props) => {
    const {
        prediction,
        index,
        setInputValue
    } = props;

    const { marker, searchTerm, setCardName } = useSearch();

    const handleMouseEnter = (e) => {
        e.target.classList.add('bg-grey');
        // Sets prediction as search input value when mouse hovers on it 
        setInputValue(prediction);
        // Set card name if form submitted
        setCardName(prediction);
    };

    const handleMouseOut = (e) => {
        e.target.classList.remove('bg-grey');
    };


    const Value = ({ prediction, searchTerm }) => {
        // Gets the index of the first letter matching searchTerm in name string
        const firstIndex = prediction.toLowerCase().indexOf(searchTerm.toLowerCase());
        // Gets the index of the last letter matching searchTerm in name string
        const lastIndex = firstIndex + searchTerm.length;
        const head = prediction.substring(0, firstIndex);
        const body = prediction.substring(firstIndex, lastIndex);
        const tail = prediction.substring(lastIndex, prediction.length);
        return (
            <span>{head}<strong>{body}</strong>{tail}</span>
        );
    }

    return (
        <li
            id={prediction}
            className={index === marker ? 'prediction bg-grey' : 'prediction'}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
        >
            {<Value searchTerm={searchTerm} prediction={prediction} />}
        </li>
    );
};

export default Prediction;