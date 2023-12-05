import React, { useState, useEffect, useContext, useRef } from 'react'
import Prediction from './Prediction';
import { SearchContext } from '../../../contexts/SearchContext';
const INIT = -200;

const AutoComplete = (props) => {
    const { predictions, searchCards } = props;
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
        }
    };

    const handleMouseDown = (e) => {
        searchCards(e);
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
                                searchCards={searchCards}
                            />
                        )
                    );
                })}
        </ul>
    );
}

export default AutoComplete;