import { useEffect, useRef } from 'react';
import LeftBtn from './LeftBtn';
import RightBtn from './RightBtn';
import Slide from './Slide';
import SlideFrame from './SlideFrame';
import SlideIndicators from './SlideIndicators';
import useViewportContext from '../../../hooks/contexthooks/useViewportContext';
import useSlider from '../../../hooks/useSlider';

const SlideShow = ({ images, layouts }) => {

    const {
        handleOffset,
        handleIndicator,
        setSlider,
        handleScrollTimeout,
        handleSwipe,
        handleSlide,
        offset,
        indicator,
        interval,
        swipe,
        min,
        max,
        scrollTimeout,
        slideIndex,
        slide
    } = useSlider();

    const trackRef = useRef(null);
    const slideRefs = useRef([]);

    const { isMobile, viewportWidth } = useViewportContext();

    useEffect(() => {
        // Initialization, 
        // min : the left most offset coordinate as min
        // interval : the width covered by each slide [100 : 100vw]
        // swipe: abled if mobile else false
        setSlider({
            min: (images.length - 1) * -100,
            interval: 100,
            swipe: !isMobile ? false : true
        });
    }, [])

    useEffect(() => {
        trackRef.current.style.left = `${offset}vw`;
        handleIndicator(Math.abs(offset / interval));
    }, [offset])


    const moveSlide = (e) => {
        e.stopPropagation();

        if (e.target.name === 'slide-right') {

            if (offset > min) {
                handleOffset(offset - interval)
            }
        }
        else if (e.target.name === 'slide-left') {

            if (offset < max) {
                handleOffset(offset + interval)
            }
        }
        else if (e.target.name === 'indicator') {
            swipe && handleSwipe(false);
            const indicatorIndex = parseInt(e.target.id);
            const coordinateIndex = Math.abs(offset / 100);
            const move = (coordinateIndex - indicatorIndex) * 100;
            if (!isMobile) {
                handleOffset(offset + move);
            }
            else {
                document.querySelectorAll('.slide')[indicatorIndex].scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
                handleIndicator(Math.abs(offset + move / interval));
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
        !swipe && handleSwipe(true);
    }

    const handleTouchEnd = (e) => { }

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
