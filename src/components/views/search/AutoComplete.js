import React, { useState, useEffect, useContext, useRef } from 'react'
import Predictions from './Predictions';
import { SearchContext } from '../../../contexts/SearchContext';
const INIT = -200;

const AutoComplete = (props) => {
    const { predictions, handleSubmit } = props;
    const {
        marker,
        setMarker,
        searchTerm,
        setCardName,
        displayAutcomplete
    } = useContext(SearchContext);
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
        setCardName(predictions[marker]);
        ulRef.current.scrollTo({ top: position, behavior: 'smooth' })
    }, [marker])


    // Keyboard arrow up and down autocomplete list searching function
    const handleKeyDown = (e) => {

        if (predictions) {
            if (e.key === 'ArrowDown') {

                // console.log(marker)
                if (marker < predictions.length - 1) {
                    setPosition(position + 40)
                    setMarker(marker + 1);
                }
            } 
            if (e.key === 'ArrowUp') {

                // console.log(marker)
                ulRef?.current?.scrollIntoView(true)
                if (marker === predictions.length - 1 || marker >= 0) {
                    setPosition(position - 40);
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

    return (
        <ul
            id="autocomplete-list"
            className="autocomplete-list"
            ref={ulRef}
        >
            {displayAutcomplete &&
                predictions?.map((prediction, index) => {
                    return (
                        (
                            <Predictions
                                key={index}
                                index={index}
                                marker={marker}
                                prediction={prediction}
                                handleSubmit={handleSubmit}
                            />
                        )
                    );
                })}
        </ul>
    );
}

export default AutoComplete;