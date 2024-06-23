import { useEffect, useRef } from 'react';
import useSlideButton from '../../../hooks/useSlideButton';

const Slide = ({ image, layout }) => {
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const { setSlideRefs, slideBtn } = useSlideButton();

    useEffect(() => {
        setSlideRefs({ layout: layout, btnRef: btnRef, cardRef: cardRef })
    }, [])

    return (
        <>
            <div className="slide">
            {
                    slideBtn &&
                    <div className='slide-inner'>
                            <button
                                ref={btnRef}
                                onClick={slideBtn.handler}
                                {...slideBtn.props}
                            >
                                {slideBtn.icon}
                            </button>
                        </div>
            }

            {
                layout === 'reversible' ?
                        (
                            <div className="two-sided-slide">
                                <div className={`card-faces`} ref={cardRef}>
                                    <div className='card-front card-radius'>
                                        {image[0]}
                                    </div>
                                    <div className='card-back card-radius'>
                                        {image[1]}
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <div className={layout}>
                                <div className="one-sided-slide" ref={cardRef}>
                                    {image}
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default Slide