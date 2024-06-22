import { useEffect, useReducer, useRef } from 'react';
import Slide from './Slide';
import SlideIndicators from './SlideIndicators';
import { slideShowReducer } from '../services/slideShowReducer';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const initialState = {
    min: 0,
    max: 0,
    interval: 100,
    coordinate: 0,
    indicator: 0
}

const SlideShow2 = (slides) => {
    const [state, dispatch] = useReducer(slideShowReducer, initialState);

    const trackRef = useRef(null);

    const { layouts, handleModalContent } = useModalContext();

    const {
        coordinate,
        indicator,
        interval,
        min,
        max,
        open,
    } = state;

    useEffect(() => {
        const limit = (slides.length - 1) * - interval
        handleMinimalLimit(limit)
    }, [])

    function handleMinimalLimit(value) {
        dispatch({
            type: 'minimal-limit',
            payload: value
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


    return (
        <div className={"slide-show"}>
            <div className="modal-frame">
                <SlideIndicators items={slides.length} currentIndicator={indicator} />
            </div>
            <div className={"slide-track"} ref={trackRef}>
                {
                    slides.map((slide, i) => <Slide index={i} layout={slide.layout} />)
                }
            </div>
        </div>
    )
}

export default SlideShow2
