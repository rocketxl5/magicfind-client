
const CatalogCardFooter = ({ handleClick }) => {

    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                <button id="add-to-wishlist" className="btn bg-green color-light" type="button" onClick={handleClick}>Add to Wishlist</button>
            </div>
            <div className="btn-container">
                <button id="add-to-cart" className="btn bg-yellow color-light" type="button" onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    )
}

export default CatalogCardFooter;
