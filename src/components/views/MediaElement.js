const MediaElement = ({ children, handleSliderView, id }) => {
    return (
        <div className="media-element">
            <button id={id} className="feature-cover" name="feature-cover" onClick={(e) => handleSliderView(e)}>
                {children[0]}
            </button>
            <p>{children[1]}</p>
        </div>
    )
}


export default MediaElement
