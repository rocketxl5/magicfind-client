import { useEffect, useRef } from 'react';
import useSlideButton from '../../../hooks/useSlideButton';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Slide = ({ image, layout }) => {
// const { image } = useModalContext();
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
                    <button
                        ref={btnRef}
                        onClick={slideBtn.handler}
                        {...slideBtn.props}
                    >
                        {slideBtn.icon}
                    </button>
            }
                <div className='slide-image'>
            {
                layout === 'reversible' ?
                    (
                        <div className={layout}>
                            <div className='slide-inner' ref={cardRef}>
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
                            <div className="slide-inner" ref={cardRef}>
                                        {image[0]}
                            </div>
                        </div>
                    )
            }
        </div>
            </div>
        </>
    )
}

export default Slide