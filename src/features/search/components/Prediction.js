import useSearch from '../../../hooks/contexthooks/useSearch';
import useSearchForm from '../../../hooks/useSearchForm';

const Prediction = ({ index, prediction }) => {

    const {
        tracker,
        inputValue,
    } = useSearch();

    const { handleSelection } = useSearchForm();

    const handleMouseEnter = (e) => {
        console.log(e.target.id)
        handleSelection(e.target.id);
        e.target.classList.add('bg-grey');
    };

    const handleMouseOut = (e) => {
        handleSelection('');
        e.target.classList.remove('bg-grey');
    };

    const Value = ({ prediction, value }) => {
        // Gets the index of the first letter matching prediction in name string
        const firstIndex = prediction.toLowerCase().indexOf(value.toLowerCase());
        // Gets the index of the last letter matching inputValue in name string
        const lastIndex = firstIndex + value.length;
        const head = prediction.substring(0, firstIndex);
        const body = prediction.substring(firstIndex, lastIndex);
        const tail = prediction.substring(lastIndex, prediction.length);
        return (
            <>{head}<strong>{body}</strong>{tail}</>
        );
    }

    return (
        <li
            id={prediction}
            className={index === tracker ? 'prediction bg-grey' : 'prediction'}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
        >
            {<Value value={inputValue} prediction={prediction} />}
        </li>
    );
};

export default Prediction;