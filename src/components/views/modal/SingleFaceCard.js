import { useRef, useState, useEffect } from 'react'
import RotateBtn from '../search/cardbtn/RotateBtn';
import FlipBtn from '../search/cardbtn/FlipBtn';

const SingleFaceCard = ({ children, action }) => {
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <div id={action} className="slide-view" >
            <div className="modal-slide-content">
                <div className="single-faced-card" ref={cardRef}>
                    {children}
                    {
                        isMounted &&
                            action === 'flip' ? (
                                <FlipBtn target={cardRef} />
                        ) : action === 'rotate' ? (
                                <RotateBtn target={cardRef} />
                        ) : (
                            <></>
                        )

                    }
                </div>
            </div>
        </div>
    )
}

export default SingleFaceCard
