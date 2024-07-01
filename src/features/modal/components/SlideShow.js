import { useEffect, useReducer, useRef } from 'react';
import LeftBtn from './LeftBtn';
import RightBtn from './RightBtn';
import Slide from './Slide';
import SlideFrame from './SlideFrame';
import SlideIndicators from './SlideIndicators';
import useViewportContext from '../../../hooks/contexthooks/useViewportContext';
import { slideShowReducer } from '../services/slideShowReducer';

const initialState = {
    min: 0,
    max: 0,
    interval: 100,
    swipe: true,
    coordinate: 0,
    indicator: 0,
    scrollTimeout: undefined
}

const SlideShow2 = ({ images, layouts }) => {
    const [state, dispatch] = useReducer(slideShowReducer, initialState);

    const {
        coordinate,
        indicator,
        interval,
        swipe,
        min,
        max,
        scrollTimeout,
    } = state;

    const trackRef = useRef(null);

    const { isMobile, viewportWidth } = useViewportContext();

    useEffect(() => {
        handleLimit((images.length - 1) * -interval);
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
            handleSwipe(false);
            const indicatorIndex = parseInt(e.target.id);
            const coordinateIndex = Math.abs(coordinate / 100);
            const move = (coordinateIndex - indicatorIndex) * 100;
            if (!isMobile) {
                handleCoordinate(coordinate + move);
            }
            else {
                document.querySelectorAll('.slide')[indicatorIndex].scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
                handleIndicator(Math.abs(coordinate + move / interval));
            }

            handleSwipe(true)
        }
    }

    const handleScroll = (e) => {
        if (swipe) {
            handleScrollTimeout(clearTimeout(scrollTimeout));

            handleScrollTimeout(setTimeout(() => {
                handleIndicator(e.target.scrollLeft / viewportWidth);
            }, 50));
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
            <div className={"slide-track slide-show-scroller"} onScroll={isMobile && handleScroll} ref={trackRef}>
                {
                    images?.map((image, i) => <Slide key={i} image={image} index={i} layout={layouts[i]} handleTouch={moveSlide} />)
                }
            </div>
        </>
    )
}

export default SlideShow2
