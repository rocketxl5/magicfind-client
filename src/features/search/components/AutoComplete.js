import React, { useEffect, useRef } from 'react'
import Prediction from './Prediction';
import useSearch from '../../../hooks/contexthooks/useSearch';

const AutoComplete = () => {
    const {
        tracker,
        position,
        predictions,
        dispatch
    } = useSearch();

    const ulRef = useRef(null);


    const handleTrackSearch = (tracker, position) => {
        dispatch({
            type: 'track-scroll',
            payload: {
                tracker: tracker,
                position: position
            }
        });
    }

    const handleLaunchSearch = (term) => {
        dispatch({
            type: 'launch-search',
            payload: term
        });
    }

    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    // Updates scroll position of autocomplete list (ul).
    // tracker's value updates on arrow key events (up or down).
    useEffect(() => {
        ulRef.current?.scrollTo({ top: position, behavior: 'smooth' })
    }, [tracker])

    // Keyboard arrow up and down autocomplete list search function
    const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                if (tracker < predictions.length - 1) {
                    handleTrackSearch(tracker + 1, position + 40);
                }
            }
        if (e.key === 'ArrowUp') {
                ulRef?.current?.scrollIntoView(true)
            if (tracker === predictions.length - 1 || tracker >= 0) {
                handleTrackSearch(tracker - 1, position - 40);
                }
            }
    }

    const handleMouseDown = (e) => {
        console.log(e.target)
        handleLaunchSearch(predictions[e.target.value])
    }

    return (
        <ul
            id="autocomplete-list"
            className="autocomplete-list"
            onMouseDown={handleMouseDown}
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