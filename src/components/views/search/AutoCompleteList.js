import React, { useEffect, useContext } from 'react'
import Predictions from './Predictions';
import { SearchContext } from '../../../contexts/SearchContext';

const AutoComplete = (props) => {
    const { predictions, handleSubmit } = props;
    const {
        marker,
        setMarker,
        showPredictions,
        setIsSubmitted,
        setCardName
    } = useContext(SearchContext);

    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    useEffect(() => {
        console.log(marker)
    }, [marker])

    // Keyboard arrow up and down autocomplete list searching function
    const handleKeyDown = (e) => {
        if (predictions) {
            if (e.key === 'ArrowDown') {
                marker < predictions.length && setMarker(marker + 1);
            }
            if (e.key === 'ArrowUp') {
                marker > 0 && setMarker(marker - 1);
            }
        }
    };

    // Click event manager function on list of suggestions
    const handleClick = (e) => {
        setCardName(e.target.textContent);
        handleSubmit();
        // Triggers fetchSingleCard function @Search[searchType] component
        // setIsSubmitted(true);
        // localStorage.setItem('searchTerm', JSON.stringify(content));
    };



    return (
        <ul
            onClick={handleClick}
            id="autocomplete-list"
            className="autocomplete-list"
        >
            {
                predictions.map((prediction, index) => {
                    return (
                        showPredictions && (
                            <Predictions
                                key={index}
                                marker={marker}
                                prediction={prediction}
                                index={index}
                            />
                        )
                    );
                })}
        </ul>
    );
}

export default AutoComplete;
