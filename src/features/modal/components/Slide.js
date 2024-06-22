import { useEffect, useRef } from 'react';
import useSlideButton from '../../../hooks/useSlideButton';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Slide = ({ image, layout }) => {
// const { image } = useModalContext();
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const { setSlideRefs, slideBtn } = useSlideButton();
    const { uris } = useModalContext();

    useEffect(() => {
        // console.log(uris)
        // console.log(image)
        setSlideRefs({ layout: layout, btnRef: btnRef, cardRef: cardRef })
    }, [])

    return (
        <>
            <div className="slide">
            {
                    slideBtn &&
                    // <div>
                    <button
                        ref={btnRef}
                        onClick={slideBtn.handler}
                        {...slideBtn.props}
                    >
                        {slideBtn.icon}
                    </button>
                    // </div>
            }

            {
                layout === 'reversible' ?
                        (
                            <div className={`card-faces`} ref={cardRef}>
                                <div className='card-front card-radius'>
                                    {image[0]}
                                </div>
                                <div className='card-back card-radius'>
                                    {image[1]}
                            </div>
                        </div>
                        ) :
                        (
                            <div className={`card-face ${layout}`} ref={cardRef}>
                                {/* <div className="card-face" > */}
                                {image}
                                {/* </div> */}
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default Slide