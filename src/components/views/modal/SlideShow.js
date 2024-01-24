import { useRef, useState, useEffect } from 'react'
import CloseBtn from '../search/cardbtn/CloseBtn';
import LeftBtn from '../search/cardbtn/LeftBtn';
import RightBtn from '../search/cardbtn/RightBtn';
import SingleFaceCard from './SingleFaceCard';
import DoubleFaceCard from './DoubleFaceCard';
import SlideIndicators from './SlideIndicators';
import ACTIONS from '../../../assets/data/ACTIONS';

const SlideShow = ({ children, handleClick }) => {
    const { INTERVAL, RESET, LIMIT } = ACTIONS.SLIDE;
    const [coordinate, setCoordinate] = useState(RESET);
    const [currentIndicator, setCurrentIndicator] = useState(RESET);
    const trackRef = useRef(null);

    useEffect(() => {
        LIMIT.MIN = (children.props.children.length - 1) * -INTERVAL;
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
                <SlideIndicators items={children.props.children.length} currentIndicator={currentIndicator} />
            </div>
            <div className="slide-track" ref={trackRef}>
                {
                    children.props.children.map((children, i) => {
                        const action = !children.length ? children.props.action : children[0].props.action;
                        if (['static', 'flip', 'rotate'].includes(action)) {
                            return (
                                <SingleFaceCard key={i} action={action}>
                                    <>{children}</>
                                </SingleFaceCard>
                            );
                        }
                        else {
                            return (
                                <DoubleFaceCard key={i} action={action}>
                                    <>{children}</>
                                </DoubleFaceCard>
                            );
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SlideShow
