import useModalContext from '../../hooks/contexthooks/useModalContext'
import useSlideShow from '../../hooks/useSlideShow'

const MediaElement = ({ image, index, title }) => {
    const { setSlideShowIndex } = useSlideShow();


    return (
        <div className="media-element">
            <button
                className="slide-show-btn"
                type="button"
                name="slide-show-btn"
                onClick={() => setSlideShowIndex(index)}
            >
                {image}
            </button>
            <p>{title}</p>
        </div>
    )
}

export default MediaElement