import { useState, useEffect, useRef } from 'react';
import Button from '../../../components/Button';
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
        <div className='slide-view'>
            <div className='slide'>
                {
                    slideBtn &&
                    <button ref={btnRef} onClick={slideBtn.handler} {...slideBtn.props}>
                        {slideBtn.icon}
                    </button>
                }
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
        </div>
    )
}

export default Slide