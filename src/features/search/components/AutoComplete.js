import { useEffect, useRef } from 'react'
import Prediction from './Prediction';
import useSearch from '../../../hooks/contexthooks/useSearch';
import useSearchForm from '../../../hooks/useSearchForm';

const AutoComplete = () => {
    const {
        tracker,
        position,
        predictions,
        selection
    } = useSearch();

    const { searchFor, setSelection, setTrackSearch } = useSearchForm();

    const ulRef = useRef(null);

    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    // Updates scroll position of autocomplete list (ul).
    // tracker's value updates on arrow key events (up or down).
    useEffect(() => {
        tracker >= 0 && setSelection(predictions[tracker]);
        ulRef.current?.scrollTo({ top: position, behavior: 'smooth' })
    }, [tracker])

    // Keyboard arrow up and down autocomplete list search function
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            if (tracker < predictions.length - 1) {
                setTrackSearch(tracker + 1, position + 40);
            }
        }
        if (e.key === 'ArrowUp') {
                ulRef?.current?.scrollIntoView(true)
            if (tracker === predictions.length - 1 || tracker >= 0) {
                setTrackSearch(tracker - 1, position - 40);
            }
        }

    }

    return (
        <ul
            id="autocomplete-list"
            className="autocomplete-list"
            onMouseDown={() => searchFor(selection)}
            ref={ulRef}
        >
            {
                predictions?.map((prediction, index) => {
                    return (
                        (
                            <Prediction
                                key={index}
                                index={index}
                                prediction={prediction}
                            />
                        )
                    );
                })}
        </ul>
    );
}

export default AutoComplete;