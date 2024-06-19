import { useEffect, useRef } from 'react';
import useSlideBtn from '../../../hooks/useSlideBtn';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Slide = ({ layout, index }) => {
    const { images } = useModalContext();
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const { setSlideRefs, slideBtn } = useSlideBtn();

    useEffect(() => {
        setSlideRefs({ layout: layout, btnRef: btnRef, cardRef: cardRef })
    }, [])

    return (
        <>
            <div className="slide-btn">

            {
                slideBtn &&
                <button ref={btnRef} onClick={slideBtn.handler} {...slideBtn.props}>
                    {slideBtn.icon}
                </button>
            }
            </div>
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