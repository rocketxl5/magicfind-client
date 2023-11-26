import { useState } from 'react';

const CatalogCardFooter = (props) => {

    const handleClick = (e) => {
        console.log(e.target)
    }
    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                <button className="card-btn bg-green color-light" type="button" onClick={handleClick}>Add to Wishlist</button>
            </div>
            <div className="btn-container">
                <button className="card-btn bg-yellow color-light" type="button" onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    )
}

export default CatalogCardFooter
