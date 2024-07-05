import useModal from '../../../hooks/useModal';

const MediaElement = (props) => {
    const { cover, title, ...rest } = props
    const { setShowModal } = useModal();

    return (
        <div className="media-element" data-media-element>
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