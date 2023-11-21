const CardImage = ({ attributes }) => {

    return (
        <div className="card-image-container" >
            <img {...attributes} />
        </div>
    )
}

export default CardImage;
