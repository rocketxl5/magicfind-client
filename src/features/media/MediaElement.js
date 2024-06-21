import useModalContext from '../../hooks/contexthooks/useModalContext'

const MediaElement = ({ title, image }) => {
    const { handleModalProps } = useModalContext();

    return (
        <div className="media-element">
            <button
                className="slide-show-btn"
                type="button"
                name="slide-show-btn"
                onClick={(e) => console.log(e.target)}
            >
                {image}
            </button>
            <p>{title}</p>
        </div>
    )
}

export default MediaElement