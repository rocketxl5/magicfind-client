import { useState, useEffect } from 'react';
import useModal from '../../../hooks/useModal';
import useViewportContext from '../../../hooks/contexthooks/useViewportContext';

const MediaElement = (props) => {
    const { cover, title, ...rest } = props;
    const [currentTarget, setCurrentTarget] = useState(null);
    const { setShowModal } = useModal();

    const { isMobile } = useViewportContext();

    const handleMouseMove = (e) => {
    }

    useEffect(() => {
        if (currentTarget) {

            document.addEventListener('mousemove', handleMouseMove);

            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
        else {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [currentTarget])



    const handleMouseDown = (e) => {
        console.log(e.currentTarget)
        setCurrentTarget(e.currentTarget)
        // console.log(parent.style.left)

    }

    const handleMouseUp = (e) => {
        setCurrentTarget(null)
    }

    return (
        <div className="media-element" data-media-element onMouseDown={() => isMobile && handleMouseDown} onMouseUp={() => isMobile && handleMouseUp}>
            <button
                className="media-element-btn"
                type="button"
                name="media-element-btn"
                onClick={() => setShowModal({ type: 'slide-show', ...rest })}
            >
                {cover}
            </button>
            <p>{title}</p>
        </div>
    )
}

export default MediaElement