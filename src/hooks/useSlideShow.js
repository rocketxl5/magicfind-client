import { useEffect, useReducer } from 'react';
import { slideShowReducer } from '../features/modal/services/slideShowReducer';

const initialState = {
    min: 0,
    max: 0,
    interval: 100,
    swipe: undefined,
    coordinate: 0,
    indicator: 0,
    slideIndex: undefined,
    scrollTimeout: null,
    slide: null
}

const useSlideShow = () => {
    const [state, dispatch] = useReducer(slideShowReducer, initialState);

    const {
        coordinate,
        indicator,
        interval,
        swipe,
        min,
        max,
        scrollTimeout,
        slideIndex,
        slide
    } = state;

    function handleSetSlideShow(min, swipe) {
        dispatch({
            type: 'set-slide-show',
            payload: {
                min: min,
                swipe: swipe
            }
        })
    }

    function handleCoordinate(value) {
        dispatch({
            type: 'set-coordinate',
            payload: value
        })
    }

    function handleIndicator(value) {
        dispatch({
            type: 'set-indicator',
            payload: value
        })
    }

    function handleScrollTimeout(value) {
        dispatch({
            type: 'set-timeout',
            payload: value
        })
    }

    function handleSwipe(swipe) {
        dispatch({
            type: 'set-swipe',
            payload: swipe
        })
    }

    function handleSlide(slide) {
        dispatch({
            type: 'set-slide',
            payload: slide
        })
    }

    return {
        handleCoordinate,
        handleIndicator,
        handleSetSlideShow,
        handleScrollTimeout,
        handleSlide,
        handleSwipe,
        coordinate,
        indicator,
        interval,
        swipe,
        min,
        max,
        scrollTimeout,
        slideIndex,
        slide
    }
}

export default useSlideShow
