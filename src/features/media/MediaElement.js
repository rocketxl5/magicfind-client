import useModalContext from '../../hooks/contexthooks/useModalContext'

const MediaElement = ({ image, index, title }) => {
    const { handleModalProps, layouts } = useModalContext();

    return (
        <div className="media-element">
            <button
                className="media-element-btn"
                type="button"
                name="media-element-btn"
                onClick={() => handleModalProps({ type: 'slide-show', index: index, layouts: layouts[index] })}
            >
                {image}
            </button>
            <p>{title}</p>
        </div>
    )
}

export default MediaElement