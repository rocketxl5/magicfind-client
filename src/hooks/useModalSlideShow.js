import { useState, useEffect } from 'react'

const useModalSlideShow = () => {
    const [modalSlideShow, setModalSlideShow] = useState(null);

    useEffect(() => {
        if (modalSlideShow) {
            const { layout, index } = modalSlideShow;
            switch (layout) {
                case '':

                    break;

                default:
                    break;
            }
        }
    }, [modalSlideShow])

    return { setModalSlideShow }
}

export default useModalSlideShow