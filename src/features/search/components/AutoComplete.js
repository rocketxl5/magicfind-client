import React, { useState, useEffect, useRef } from 'react'
import Prediction from './Prediction';
import useSearch from '../../../hooks/contexthooks/useSearch';
const INIT = -200;

const AutoComplete = () => {
    const {
        marker,
        setMarker,
        searchTerm,
        predictions,
        setSearchTerm,
        displayAutcomplete
    } = useSearch();
    const [position, setPosition] = useState(INIT);
    const ulRef = useRef(null)

    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    // Reset position state to its initial value when searchterm state changes.
    // Searchterm updates as user updates input entry
    useEffect(() => {
        setPosition(INIT)
    }, [searchTerm])

    // Update cardname state on marker change.
    // Updates scroll position of autocomplete list (ul).
    // Marker's value updates on arrow key events (up or down).
    useEffect(() => {
        // If array of predictions is defined
        if (predictions) {
            // Sets prediction string as search input value when user moves (arrow) up or (arrow) down
            // setInputValue(predictions[marker]);
            // setSearchTerm(predictions[marker]);
        }

        ulRef.current?.scrollTo({ top: position, behavior: 'smooth' })
    }, [marker])

    // Keyboard arrow up and down autocomplete list search function
    const handleKeyDown = (e) => {
        if (predictions) {
            if (e.key === 'ArrowDown') {
                // console.log(marker)
                if (marker < predictions.length - 1) {
                    setPosition(position + 40)
                    setMarker(marker => marker + 1);
                }
            }
            if (e.key === 'ArrowUp') {
                // console.log(predictions[marker])
                ulRef?.current?.scrollIntoView(true)
                if (marker === predictions.length - 1 || marker >= 0) {
                    setPosition(position - 40);
                    setMarker(marker => marker - 1);
                }
            }
        }
    };

    const handleMouseDown = (e) => {
        console.log(e.target.value)
        // Set search input value to card name
        // Takes event and target li id set to prediction value @ Prediction

        setSearchTerm(predictions[e.target.value]);
    };

    return (
        <ul
            id="autocomplete-list"
            className="autocomplete-list"
            onMouseDown={handleMouseDown}
            ref={ulRef}
        >
            {displayAutcomplete &&
                predictions?.map((prediction, index) => {
                    return (
                        (
                            <Prediction
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