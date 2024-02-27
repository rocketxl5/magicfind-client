import { useRef, useState, useEffect } from 'react'
import RotateBtn from './buttons/RotateBtn';
import FlipBtn from './buttons/FlipBtn';

const SingleFaceCard = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef(null);
    const motion = children?.props.motion;
    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <div id={motion} className="slide-container" >
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
                <div className="single-faced-card" ref={cardRef}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SingleFaceCard