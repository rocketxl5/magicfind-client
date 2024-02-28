const MediaElement = ({ children, handleSlideShow, id }) => {
    return (
        <div className="media-element">
            <button id={id} className="slide-show-btn" type="button" name="slide-show-btn" onClick={(e) => {
                handleSlideShow(e, id);
            }}>
                {children[0]}
            </button>
            <p>{children[1]}</p>
        </div>
    )
}


export default MediaElement