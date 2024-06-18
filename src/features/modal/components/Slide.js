import { useEffect } from 'react';
import useModalFrame from '../../../hooks/useModalFrame';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Slide = ({ layout, index }) => {
    const { images } = useModalContext();
    const { setLayout, Frame, cardRef } = useModalFrame();

    useEffect(() => {
        // console.log(images[index])
        if (layout) {
            setLayout(layout)
        }
    }, [layout]);

    return (
        <div className='slide-view'>
            <Frame />
            <div className='slide'>
                {
                    layout === 'reversible' ?
                        (
                            <div className={layout}>
                                <div className='reversible-inner' ref={cardRef}>
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
                                {images[index]}
                            </div>
                        )
                }

            </div>
        </div>
    )
}

export default Slide