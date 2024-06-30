import { useEffect, useReducer, useRef } from 'react';
import LeftBtn from './LeftBtn';
import RightBtn from './RightBtn';
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

const SlideShow2 = ({ images, layouts }) => {
    const [state, dispatch] = useReducer(slideShowReducer, initialState);

    const {
        coordinate,
        indicator,
        interval,
        min,
        max,
    } = state;

    const trackRef = useRef(null);

    useEffect(() => {
        handleLimit((images.length - 1) * -interval)
    }, [])

    useEffect(() => {
        trackRef.current.style.left = `${coordinate}vw`;
        handleIndicator(Math.abs(coordinate / interval));
    }, [coordinate])

    function handleLimit(value) {
        dispatch({
            type: 'set-limit',
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

    const moveSlide = (e) => {
        e.stopPropagation();

        if (e.target.name === 'slide-right') {

            if (coordinate > min) {
                handleCoordinate(coordinate - interval)
            }
        }
        else if (e.target.name === 'slide-left') {

            if (coordinate < max) {
                handleCoordinate(coordinate + interval)
            }
        }
        else if (e.target.name === 'indicator') {
            const indicatorIndex = parseInt(e.target.id);
            const coordinateIndex = Math.abs(coordinate / 100);
            const move = (coordinateIndex - indicatorIndex) * 100;
            handleCoordinate(coordinate + move);
        }
    }

    return (
        <>
            <SlideFrame>
                <SlideIndicators
                    items={images.length}
                    currentIndicator={indicator}
                    handleClick={moveSlide}
                />
                <LeftBtn type={'modal'} handleClick={moveSlide} />
                <RightBtn type={'modal'} handleClick={moveSlide} />
            </SlideFrame>
            <div className={"slide-track slide-show-scroller"} ref={trackRef}>
                {
                    images?.map((image, i) => <Slide key={i} image={image} layout={layouts[i]} />)
                }
            </div>
        </>
    )
}

export default SlideShow2
