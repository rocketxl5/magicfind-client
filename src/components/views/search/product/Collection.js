
const Collection = () => {
    return (
        <div className="card-btns">
            <div className="btn-container">
                < button id="delete-card" className="btn bg-red color-light" type="button">
                    Delete
                </button>
            </div>

            <div className="btn-container">
                <button id="edit-card" className="btn bg-blue color-light" type="button">Edit</button>
            </div>

        </div>
    )
}

export default Collection