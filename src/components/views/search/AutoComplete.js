import React, { useEffect, useContext } from 'react'
import Predictions from './Predictions';
import { SearchContext } from '../../../contexts/SearchContext';

const AutoComplete = (props) => {
    const { predictions, handleSubmit } = props;
    const {
        marker,
        setMarker,
        setCardName,
        showPredictions
    } = useContext(SearchContext);

    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    // Sets the value of cardName state if prediction === 1
    // 
    useEffect(() => {
        if (predictions.length === 1) {
            setCardName(predictions[predictions.length - 1])
        }
    }, [predictions])

    useEffect(() => {
        setCardName(predictions[marker]);
    }, [marker])

    // Keyboard arrow up and down autocomplete list searching function
    const handleKeyDown = (e) => {
        if (predictions) {

            if (e.key === 'ArrowDown') {
                // console.log(marker)
                if (marker < predictions.length - 1) {
                    setMarker(marker + 1);
                }
            } 
            if (e.key === 'ArrowUp') {
                console.log(marker)
                if (marker === predictions.length - 1 || marker >= 0) {
                    setMarker(marker - 1);
                }
            }

            // if (e.key === 'Enter') {
            //     if (predictions.length === 1 && predictions[predictions.length - 1]) {
            //         console.log(predictions[predictions.length - 1])
            //         setCardName(predictions[predictions.length - 1])
            //         handleSubmit()
            //     }
            // }
        }
    };

    // Click event manager function on list of suggestions
    const handleOnMouseDown = (e) => {
        handleSubmit();
        // localStorage.setItem('searchTerm', JSON.stringify(content));
    };

    return (
        <ul
            onMouseDown={handleOnMouseDown}
            id="autocomplete-list"
            className="autocomplete-list"
        >
            {showPredictions &&
                predictions.map((prediction, index) => {
                    return (
                        (
                            <Predictions
                                key={index}
                                index={index}
                                marker={marker}
                                prediction={prediction}
                            />
                        )
                    );
                })}
        </ul>
    );
}

export default AutoComplete;