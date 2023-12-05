const CollectionCardFooter = ({ card, handleClick }) => {

    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                < button id="delete-card" className="btn bg-red color-light" type="button" onClick={handleClick}>
                    Delete
                </button>
            </div>
            {!card.isPublished ? (
                <div className="btn-container">
                    <button id="publish-card" className="btn bg-blue color-light" type="button" onClick={() => { }}>Publish</button>
                </div>
            ) : (
                <div className="btn-container">
                        <button id="unpublish-card" className="btn bg-yellow color-light" type="button" onClick={() => { }}>Unpublish</button>
                </div>
            )}
        </div>
    )
}

export default CollectionCardFooter
