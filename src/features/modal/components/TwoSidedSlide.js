import { useState, useEffect } from 'react'
import TurnBtn from '../buttons/TurnBtn';

const TwoSidedSlide = ({ children, card, front }) => {
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        // <div id={motion} className={classList.container} >
        <div className={'slide relative'}>
            {/* {isMounted && <TurnBtn classList={`${classList.btn}`} front={frontRef} inner={innerRef} />} */}
            <div className="reversible">
                <div className="reversible-inner card-radius" ref={card}>
                    <div className="card-front card-radius" ref={front}>
                        {children[0]}
                    </div>
                    <div className="card-back card-radius">
                        {children[1]}
                    </div>
                </div>
                {children[2]}
            </div>
        </div>
        // </div>
    )
}

export default TwoSidedSlide
