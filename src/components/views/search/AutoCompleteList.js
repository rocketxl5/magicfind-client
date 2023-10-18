import React, { useState, useEffect, forwardRef, useContext } from 'react'
import Predictions from './Predictions';
import { SearchContext } from '../../../contexts/SearchContext';

const AutoComplete = forwardRef(function AutoComplete(props, ref) {
    const { cardNames, predictionList } = props;
    const ulRef = ref;
    const [power, setPower] = useState(false);
    const [currentPrediction, setCurrentPrediction] = useState(null);
    const [previousPrediction, setPreviousPrediction] = useState(null);
    const [hoverTarget, setHoverTarget] = useState(null);

    const {
        searchInput,
        setCardName,
        isValidLength,
        setIsSubmitted,
        tracker,
        setTracker
    } = useContext(SearchContext);


    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    // Rendering and styling of a Prediction list item single component
    // Is triggered on currentPrediction state change and hoverList state change
    useEffect(() => {
        // If predictionList is defined (ul is populated) and Prediction change
        // are triggered with arrowup and arrowdown keypress.
        // if (power) {
        setPower(false);
        if (!hoverTarget && predictionList) {
            if (currentPrediction && previousPrediction) {
                currentPrediction.style['background'] = '#efefef';
                previousPrediction.style['background'] = '#fff';
            }
            // keydown form search input field
            if (currentPrediction && !previousPrediction) {
                currentPrediction.style['background'] = '#efefef';
            }
            // keyup back into search input field
            if (!currentPrediction && previousPrediction) {
                previousPrediction.style['background'] = '#fff';
            }

            if (
                !currentPrediction &&
                !previousPrediction &&
                predictionList.firstChild
            ) {
                predictionList.firstChild.style['background'] = '#fff';
            }
            // Else if predictionListis defined (ul is populated) and Suggestions change
            // are triggered with the mouse hover
        } else if (hoverTarget && predictionList) {
            // console.log(hoverTarget);
            // if currentPrediction is defined (mot null)
            if (currentPrediction) {
                currentPrediction.style['background'] = '#fff';
                hoverTarget.style['background'] = '#e4e4e4';
                setPreviousPrediction(currentPrediction);
                setCurrentPrediction(hoverTarget);
            } else {
                hoverTarget.style['background'] = '#e4e4e4';
                setPreviousPrediction(hoverTarget);
                setCurrentPrediction(hoverTarget);
            }
        }
        // }
    }, [currentPrediction, hoverTarget]);

    // Keyboard arrow up and down autocomplete list searching function
    const handleKeyDown = (e) => {
        if (predictionList) {
            // Sets hover state to false for useEffect hook above
            setHoverTarget(false);

            if (e.key === 'ArrowDown') {
                setPower(true);
                let listItem = '';
                if (tracker === predictionList.childNodes.length) {
                    // console.log(currentPrediction.tabIndex);
                    return console.log('cant go any higher');
                }
                if (tracker === 0) {
                    listItem = predictionList.firstChild;
                    setCurrentPrediction(listItem);
                    setPreviousPrediction(null);
                } else if (!currentPrediction && previousPrediction) {
                    listItem = previousPrediction;
                    setPreviousPrediction(null);
                    setCurrentPrediction(listItem);
                } else {
                    listItem = currentPrediction.nextSibling;
                    setPreviousPrediction(currentPrediction);
                    setCurrentPrediction(currentPrediction.nextSibling);
                }
                setTracker(tracker + 1);

                if (listItem) {
                    console.log(listItem.textContent)
                    console.log(searchInput)
                    // searchInput.value = listItem.textContent;
                    console.log(searchInput)
                }
            }
            if (e.key === 'ArrowUp') {
                setPower(true);
                let listItem = '';
                // if (!currentPrediction && !previousPrediction) {
                //   return null;
                // }

                if (tracker === 0) {
                    return console.log('cant go any lower');
                }

                if (currentPrediction.tabIndex === 0) {
                    setPreviousPrediction(null);
                    setCurrentPrediction(null);
                } else {
                    listItem = currentPrediction.previousSibling;
                    setPreviousPrediction(currentPrediction);
                    setCurrentPrediction(currentPrediction.previousSibling);
                }
                setTracker(tracker - 1);
                if (listItem) {
                    // searchInput.value = listItem.textContent;
                }
            }
        }
    };

    // Click event manager function on list of suggestions
    const handleClick = (e) => {
        console.log(e.target)
        if (e.target.nodeName === 'LI') {
            // setCardName(e.target.textContent);
            setIsSubmitted(true);
        }

        // localStorage.setItem('searchTerm', JSON.stringify(content));
    };



    return (
        <ul
            onClick={handleClick}
            id="autocomplete-list"
            className="autocomplete-list"
            ref={ulRef}
        >
            {isValidLength &&
                cardNames.map((cardName, index) => {
                    return (
                        isValidLength && (
                            <Predictions
                                key={cardName}
                                setHoverTarget={setHoverTarget}
                                cardName={cardName}
                                index={index}
                            />
                        )
                    );
                })}
        </ul>
    );
});

export default AutoComplete;
