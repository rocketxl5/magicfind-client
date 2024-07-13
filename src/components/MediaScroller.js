import { useEffect, useRef } from 'react';
import LeftBtn from '../features/modal/components/LeftBtn';
import RightBtn from '../features/modal/components/RightBtn';
import MediaElement from '../features/modal/components/MediaElement';
import useViewportContext from '../hooks/contexthooks/useViewportContext';
import useFeatureContext from '../hooks/contexthooks/useFeatureContext';
import useSlider from '../hooks/useSlider';

const MediaScroller = ({ props }) => {

    const scrollerRef = useRef(null);
    const wrapperRef = useRef(null);

    const { isMobile, isTouch } = useViewportContext();
    const {
        handleOffset,
        setSlider,
        offset,
        interval,
        min,
        max,
    } = useSlider();

    useEffect(() => {
        if (props) {
            console.log(wrapperRef.current?.getBoundingClientRect())
            setSlider({
                // min has to be negative for left style property value. end point of scroller 
                min: scrollerRef.current?.scrollWidth * -1,
                interval: wrapperRef.current?.getBoundingClientRect().width,
            });
        }
    }, [props, isMobile])


    useEffect(() => {
        scrollerRef.current.style.left = `${offset}px`;
    }, [offset])

    const moveSlide = (e) => {
        // console.log(offset)
        // console.log(interval)
        // console.log(min)
        // console.log(max)
        if (e.target.name === 'snap-left') {

            // console.log(scrollerRef?.current.offsetWidth)

            if (offset < max) {
                // handleOffset(offset - scrollerRef?.current.offsetWidth)
                handleOffset(offset + interval);
            }
        }
        else if (e.target.name === 'snap-right') {

            if (offset > min) {
                handleOffset(offset - interval)
            }
        }
    }

    return (
        <div className="media-scroller-wrapper" ref={wrapperRef}>
            <div className="media-frame">
                <LeftBtn type={'media'} handleClick={moveSlide} />
                <RightBtn type={'media'} handleClick={moveSlide} />
            </div>
            <div className={
                // viewport < 775px && touch abled device
                (isMobile && isTouch) ?
                    'touch-media-scroller snaps-inline' :
                    // viewport < 775px && !touch abled
                    (isMobile && !isTouch) ? 'mobile-media-scroller snaps-inline' :
                        // viewport >= 775px
                        'wide-media-scroller'
            } ref={scrollerRef}>
                {
                    props.map((feature, i) => {
                        return (
                            <MediaElement
                                key={i}
                                cover={feature.cover}
                                images={feature.images}
                                layouts={feature.layouts}
                                title={feature.title}
                                parent={scrollerRef.current}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MediaScroller
