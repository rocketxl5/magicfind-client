import { useRef, useState, useEffect } from 'react'
import CloseBtn from '../buttons/CloseBtn';
import LeftBtn from '../buttons/LeftBtn';
import RightBtn from '../buttons/RightBtn';
import OneSidedSlide from './OneSidedSlide';
import TwoSidedSlide from './TwoSidedSlide'
import SlideIndicators from './SlideIndicators';
import ACTIONS from '../../../data/ACTIONS';

const SlideShow = ({ slides, handleClick }) => {
    const { INTERVAL, RESET, LIMIT } = ACTIONS.SLIDE;
    const [coordinate, setCoordinate] = useState(RESET);
    const [currentIndicator, setCurrentIndicator] = useState(RESET);
    const trackRef = useRef(null);

    useEffect(() => {
        LIMIT.MIN = (slides.length - 1) * -INTERVAL;
    }, [])

    useEffect(() => {
        trackRef.current.style.left = `${coordinate}vw`;
        setCurrentIndicator(Math.abs(coordinate / INTERVAL));
    }, [coordinate])

    const setSlideMotion = (e) => {
        e.stopPropagation();
        if (e.target.name === 'right-btn') {
            if (coordinate > LIMIT.MIN)
                setCoordinate(coordinate - INTERVAL)
        }
        else if (e.target.name === 'left-btn') {
            if (coordinate < LIMIT.MAX)
                setCoordinate(coordinate + INTERVAL)
        }
    }

    return (
        <div className={"slide-show"}>
            <div className={"slide-frame"}>
                <LeftBtn classList={`slide-btn slide-left-btn card-btn`} name={'left-btn'} handleClick={setSlideMotion} />
                <RightBtn classList={`slide-btn slide-right-btn card-btn`} name={'right-btn'} handleClick={setSlideMotion} />
                <CloseBtn classList={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
                <SlideIndicators items={slides.length} currentIndicator={currentIndicator} />
            </div>

            <div className={"slide-track"} ref={trackRef}>
                {
                    slides.map((slide, i) => {

                        const motion = !slide.length ? slide.props.motion : slide[0].props.motion;
                        if (['static', 'flip', 'rotate'].includes(motion)) {
                            return (
                                <OneSidedSlide key={i} motion={motion}>
                                    {slide}
                                </OneSidedSlide>
                            );
                        }
                        else {
                            return (
                                <TwoSidedSlide key={i} classList={{ btn: 'action-btn' }} motion={motion}>
                                    {slide}
                                </TwoSidedSlide>
                            );
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SlideShow
