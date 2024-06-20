import { useEffect, useRef } from 'react';
import useSlideButton from '../../../hooks/useSlideButton';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Slide = ({ layout, index }) => {
    const { images } = useModalContext();
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const { setSlideRefs, slideBtn } = useSlideButton();

    useEffect(() => {
        setSlideRefs({ layout: layout, btnRef: btnRef, cardRef: cardRef })
    }, [])

    return (
        <>
            {
                slideBtn &&
                <div className="slide-btn-container">
                    <button
                        ref={btnRef}
                        onClick={slideBtn.handler}
                        {...slideBtn.props}
                    >
                        {slideBtn.icon}
                    </button>
                    </div>
            }
            <div className='slide'>
            {
                layout === 'reversible' ?
                    (
                        <div className={layout}>
                            <div className='slide-inner' ref={cardRef}>
                                <div className='card-front card-radius'>
                                    {images[index][0]}
                                </div>
                                <div className='card-back card-radius'>
                                    {images[index][1]}
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <div className={layout}>
                            <div className="slide-inner" ref={cardRef}>
                                {images[index]}
                            </div>
                        </div>
                    )
            }
        </div>
        </>
    )
}

export default Slide