import { useReducer } from 'react';
import { sliderReducer } from '../features/modal/services/sliderReducer';

const initialState = {
    min: 0,
    max: 0,
    interval: 0,
    swipe: undefined,
    offset: 0,
    indicator: 0,
    slideIndex: undefined,
    slide: null
}

const useSlider = () => {
    const [state, dispatch] = useReducer(sliderReducer, initialState);

    const {
        offset,
        indicator,
        interval,
        swipe,
        min,
        max,
        slideIndex,
        slide
    } = state;

    function setSlider(values) {
        dispatch({
            type: 'set-slider',
            payload: { ...values }
        })
    }

    function handleOffset(value) {
        dispatch({
            type: 'set-offset',
            payload: value
        })
    }

    function handleIndicator(value) {
        dispatch({
            type: 'set-indicator',
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
        handleOffset,
        handleIndicator,
        setSlider,
        handleSlide,
        handleSwipe,
        offset,
        indicator,
        interval,
        swipe,
        min,
        max,
        slideIndex,
        slide
    }
}

export default useSlider
