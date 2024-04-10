import { useRef, useState, useEffect } from 'react'
import TurnBtn from './buttons/TurnBtn';

const TwoSidedSlide = ({ children, classList, motion }) => {
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        // <div id={motion} className={classList.container} >
        <div className={`slide ${classList.container}`}>
            {isMounted && <TurnBtn classList={classList.btn} target={cardRef.current} />}
            <div className="double-faced-card" ref={cardRef}>
                <div className="double-faced-recto">
                    {children[0]}
                </div>
                <div className="double-faced-verso">
                    {children[1]}
                </div>
            </div>
        </div>
        // </div>
    )
}

export default TwoSidedSlide
