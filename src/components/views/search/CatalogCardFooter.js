import { forwardRef } from 'react';

const CatalogCardFooter = forwardRef(function CatalogCardFooter(props, ref) {
    const { handleClick } = props;
    const { cartRef, wishlistRef } = ref;

    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                <button id="add-to-wishlist" className="btn bg-green color-light" type="button" wishlistRef={wishlistRef} onClick={handleClick}>Add to Wishlist</button>
            </div>
            <div className="btn-container">
                <button id="add-to-cart" className="btn bg-yellow color-light" type="button" cartRef={cartRef} onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    )
})

export default CatalogCardFooter;
