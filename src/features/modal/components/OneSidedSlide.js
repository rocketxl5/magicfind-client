import { useRef, useState, useEffect } from 'react'
import RotateBtn from '../buttons/RotateBtn';
import FlipBtn from '../buttons/FlipBtn';

const OneSidedSlide = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef(null);
    console.log(children)
    const motion = children.props?.motion;
    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (

            <div className="slide">
                {
                isMounted &&
                        motion === 'flip' ? (
                        <FlipBtn target={cardRef?.current} />
                    ) : motion === 'rotate' ? (
                        <RotateBtn target={cardRef?.current} />
                    ) : (
                        <></>
                    )
                }
            <div className="one-sided" ref={cardRef}>
                    {children}
                </div>
            </div>

    )
}

export default OneSidedSlide
