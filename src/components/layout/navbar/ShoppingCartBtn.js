import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const ShoppingCartBtn = () => {
    return (
        <Link to="/shopping-cart" >
            <FiShoppingCart size={25} title="Shopping Cart" />
        </Link>
    )
}

export default ShoppingCartBtn
