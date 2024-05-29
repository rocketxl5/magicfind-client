import { useRef, useState, useEffect } from 'react'
import TurnBtn from '../buttons/TurnBtn';

const TwoSidedSlide = ({ children, classList, motion }) => {
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        // <div id={motion} className={classList.container} >
        <div className={`slide ${classList.container}`}>
            {isMounted && <TurnBtn classList={`btn-bottom-right ${classList.btn}`} target={cardRef.current} />}
            <div className="double-faced-card" ref={cardRef}>
                <div className="card-front">
                    {children[0]}
                </div>
                <div className="card-back">
                    {children[1]}
                </div>
            </div>
        </div>
        // </div>
    )
}

export default TwoSidedSlide
