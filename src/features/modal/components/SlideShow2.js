import { useEffect, useReducer, useRef } from 'react';
import Slide from './Slide';
import SlideIndicators from './SlideIndicators';
import { slideShowReducer } from '../services/slideShowReducer';

const initialState = {
    min: 0,
    max: 0,
    interval: 100,
    coordinate: 0,
    indicator: 0
}

const SlideShow2 = ({ images, layouts }) => {
    const [state, dispatch] = useReducer(slideShowReducer, initialState);

    const trackRef = useRef(null);

    const {
        coordinate,
        indicator,
        interval,
        min,
        max,
        open,
    } = state;

    useEffect(() => {
        const limit = (images.length - 1) * - interval
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
                <SlideIndicators items={images.length} currentIndicator={indicator} />
            </div>
            <div className={"slide-track"} ref={trackRef}>
                {
                    images.map((image, i) => <Slide image={image} layout={layouts[i]} />)
                }
            </div>
        </div>
    )
}

export default SlideShow2
