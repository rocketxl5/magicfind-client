
import useModalContext from '../../../hooks/contexthooks/useModalContext';
import useModal from '../../../hooks/useModal';

const MediaElement = ({ image, index, title }) => {

    const { images, layouts } = useModalContext();
    const { setShowModal } = useModal();

    return (
        <div className="media-element">
            <button
                className="media-element-btn"
                type="button"
                name="media-element-btn"
            // onClick={() => setShowModal({ type: 'slide-show', images: images[index], layouts: layouts[index] })}
            >
                {image}
            </button>
            <p>{title}</p>
        </div>
    )
}

export default MediaElement