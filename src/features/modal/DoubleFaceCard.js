import { useRef, useState, useEffect } from 'react'
import TurnBtn from '../search/cardbtn/TurnBtn'

const DoubleFaceCard = ({ children, action }) => {
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <div id={action} className="slide-view" >
            <div className="modal-slide-content">
                {isMounted && <TurnBtn target={cardRef.current} />}
                <div className="double-faced-card" ref={cardRef}>
                    <div className="double-faced-recto">
                        {children.props.children[0]}
                    </div>
                    <div className="double-faced-verso">
                        {children.props.children[1]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoubleFaceCard
