
const CollectionHandlers = ({ product, handleClick }) => {

    return (
        <div className="card-btns">
            <div className="btn-container">
                < button id="delete-product" className="btn bg-red color-light" type="button" onClick={(e) => handleClick(e, product)}>
                    Delete
                </button>
            </div>

            <div className="btn-container">
                <button id="edit-product" className="btn bg-blue color-light" type="button" onClick={(e) => handleClick(e, product)}>Edit</button>
            </div>

        </div>
    )
}

export default CollectionHandlers