import { useEffect, useReducer, useRef } from 'react';
import CloseBtn from './CloseBtn';
import Slide from './Slide';
import SlideFrame from './SlideFrame';
import SlideIndicators from './SlideIndicators';
import { slideShowReducer } from '../services/slideShowReducer';

const initialState = {
    min: 0,
    max: 0,
    interval: 100,
    coordinate: 0,
    indicator: 0
}

const SlideShow2 = ({ images }) => {
    const [state, dispatch] = useReducer(slideShowReducer, initialState);

    const trackRef = useRef(null);

    useEffect(() => {
        if (images) {
            console.log(images)
        }
    }, [images])

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
        <>
            <SlideFrame>
                <SlideIndicators items={images.length} currentIndicator={indicator} />
            </SlideFrame>
            <div className={"slide-track"} ref={trackRef}>
                {
                    // images?.map((image, i) => <Slide key={i} image={image} layout={layouts[i]} />)
                }
            </div>
        </>
    )
}

export default SlideShow2
