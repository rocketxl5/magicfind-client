import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext';
import styled from 'styled-components';

const ShoppingCartBtn = () => {
  const { itemsCount } = useContext(ShoppingCartContext);
  return (
    <Div className="nav-btn">
      <Link to="/shopping-cart" className="cart-btn">
        {itemsCount > 0 && (
          <CountContainer>
            <Count>{itemsCount}</Count>
          </CountContainer>
        )}
        <FiShoppingCart className="nav-icon" size={27} title="To Shopping Cart" />
      </Link>
    </Div>
  )
}



const Div = styled.div`
  position: relative;
  display: flex;
`;

const CountContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background: #dc3545;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 10;
`;

const Count = styled.div`
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
`;

export default ShoppingCartBtn
