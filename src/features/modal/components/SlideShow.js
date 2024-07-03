import { useEffect, useRef } from 'react';
import LeftBtn from './LeftBtn';
import RightBtn from './RightBtn';
import Slide from './Slide';
import SlideFrame from './SlideFrame';
import SlideIndicators from './SlideIndicators';
import useViewportContext from '../../../hooks/contexthooks/useViewportContext';
import useSlideShow from '../../../hooks/useSlideShow';

const SlideShow = ({ images, layouts }) => {

    const {
        handleCoordinate,
        handleIndicator,
        handleSetSlideShow,
        handleScrollTimeout,
        handleSwipe,
        handleSlide,
        coordinate,
        indicator,
        interval,
        swipe,
        min,
        max,
        scrollTimeout,
        slideIndex,
        slide
    } = useSlideShow();

    const trackRef = useRef(null);
    const slideRefs = useRef([]);

    const { isMobile, viewportWidth } = useViewportContext();

    useEffect(() => {
        const min = (images.length - 1) * -interval;
        const swipe = !isMobile ? false : true;

        handleSetSlideShow(min, swipe);
    }, [])

    useEffect(() => {
        trackRef.current.style.left = `${coordinate}vw`;
        handleIndicator(Math.abs(coordinate / interval));
    }, [coordinate])


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
            swipe && handleSwipe(false);
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
    const handleTouchStart = (e) => {
        !swipe && handleSwipe(true)


    }

    const handleTouchEnd = (e) => {



    }

    return (
        <>
            <SlideFrame>
                <SlideIndicators
                    items={images.length}
                    currentIndicator={indicator}
                    handleClick={moveSlide}
                />
                {/* CSS display none Side arrows  */}
                <LeftBtn type={'modal'} handleClick={moveSlide} />
                <RightBtn type={'modal'} handleClick={moveSlide} />
            </SlideFrame>
            <div
                className={`slide-track ${isMobile ? 'slide-show-scroller' : ''}`}
                data-slide-show
                onScroll={(e) => isMobile && handleScroll(e)}
                ref={trackRef}
            >
                {
                    images?.map((image, i) => {

                        return <Slide
                            key={i}
                            image={image}
                            index={i}
                            layout={layouts[i]}
                            handleTouchEnd={handleTouchEnd}
                            handleTouchStart={handleTouchStart}
                            slideRef={(slide) => (slideRefs.current[i] = slide)}
                        />
                    })
                }
            </div>
        </>
    )
}

export default SlideShow
