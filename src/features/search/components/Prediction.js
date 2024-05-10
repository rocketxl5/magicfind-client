import useSearch from '../../../hooks/contexthooks/useSearch';
import { useEffect } from 'react';

const Prediction = ({ index, prediction }) => {

    const { tracker, inputValue } = useSearch();

    useEffect(() => {
        console.log(inputValue)
    }, [inputValue])
    const handleMouseEnter = (e) => {
        e.target.classList.add('bg-grey');
    };

    const handleMouseOut = (e) => {
        e.target.classList.remove('bg-grey');
    };


    const Value = ({ prediction, value }) => {
        // Gets the index of the first letter matching searchTerm in name string
        const firstIndex = prediction.toLowerCase().indexOf(value.toLowerCase());
        // Gets the index of the last letter matching inputValue in name string
        const lastIndex = firstIndex + value.length;
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
            className={index === tracker ? 'prediction bg-grey' : 'prediction'}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
        >
            {<Value value={inputValue} prediction={prediction} />}
        </li>
    );
};

export default Prediction;