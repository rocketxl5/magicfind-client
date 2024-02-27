import { useRef, useState, useEffect } from 'react'
import CloseBtn from './buttons/CloseBtn';
import LeftBtn from './buttons/LeftBtn';
import RightBtn from './buttons/RightBtn';
import SingleFaceCard from './SingleFaceCard';
import DoubleFaceCard from './DoubleFaceCard'
import SlideIndicators from './SlideIndicators';
import Div from '../../components/Div';
import ACTIONS from '../../data/ACTIONS';
import { FaImages } from 'react-icons/fa6';

const SlideShow = ({ slides, handleClick }) => {
    const { INTERVAL, RESET, LIMIT } = ACTIONS.SLIDE;
    const [coordinate, setCoordinate] = useState(RESET);
    const [currentIndicator, setCurrentIndicator] = useState(RESET);
    const trackRef = useRef(null);
    console.log(slides)

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
        <Div className={"slide-show"}>
            <Div className={"slide-frame"}>
                <LeftBtn style={`slide-btn slide-left-btn card-btn`} name={'left-btn'} handleClick={setSlideMotion} />
                <RightBtn style={`slide-btn slide-right-btn card-btn`} name={'right-btn'} handleClick={setSlideMotion} />
                <CloseBtn style={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
                <SlideIndicators items={slides.length} currentIndicator={currentIndicator} />
            </Div>

            <Div className={"slide-track"} ref={trackRef}>
                {
                    slides.map((slide, i) => {
                        console.log(slide)
                        const motion = !slide.length ? slide.props.motion : slide[0].props.motion;
                        if (['static', 'flip', 'rotate'].includes(motion)) {
                            return (
                                <SingleFaceCard key={i} motion={motion}>
                                    {slide}
                                </SingleFaceCard>
                            );
                        }
                        else {
                            console.log(slide)
                            return (
                                <DoubleFaceCard key={i} motion={motion}>
                                    {slide}
                                </DoubleFaceCard>
                            );
                        }
                    })
                }
            </Div>
        </Div>
    )
}

export default SlideShow
