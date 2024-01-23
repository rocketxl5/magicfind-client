import { useRef, useState, useEffect } from 'react'
import CloseBtn from './cardbtn/CloseBtn';
import LeftBtn from './cardbtn/LeftBtn';
import RightBtn from './cardbtn/RightBtn';
import SlideIndicators from './SlideIndicators';
import ACTIONS from '../../../assets/data/ACTIONS';

const SlideShow = ({ children, handleClick, setComponent }) => {
    const { INTERVAL, RESET, LIMIT } = ACTIONS.SLIDE;
    const [slides, setSlides] = useState(null);
    const [coordinate, setCoordinate] = useState(RESET);
    const [currentIndicator, setCurrentIndicator] = useState(RESET);
    const trackRef = useRef(null);
    const SlideComponent = ({ children }) => {
        return (
            <>
                {children}
            </>
        )
    }
    useEffect(() => {
        const components = []
        children.props.children.forEach((child, i) => {
            const component = setComponent(child, i)
            components.push(component)
        });
        LIMIT.MIN = (components.length - 1) * -INTERVAL;
        setSlides(components)
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
            <div className="slide-show">
            <div className="slide-frame">
                <LeftBtn style={`slide-btn slide-left-btn card-btn`} name={'left-btn'} handleClick={setSlideMotion} />
                <RightBtn style={`slide-btn slide-right-btn card-btn`} name={'right-btn'} handleClick={setSlideMotion} />
                <CloseBtn style={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
                <SlideIndicators slides={slides} currentIndicator={currentIndicator} />
            </div>
            <div className="slide-track" ref={trackRef}>
                        {
                            slides &&
                            slides.map((slide, i) => {
                                return (
                                    <SlideComponent key={i}>
                                        {slide}
                                    </SlideComponent>
                                )
                            })

                }
            </div>
        </div>


    )
}

export default SlideShow
