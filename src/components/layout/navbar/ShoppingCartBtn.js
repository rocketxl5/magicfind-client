import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext';
import styled from 'styled-components';

const ShoppingCartBtn = () => {
  const { itemsCount } = useContext(ShoppingCartContext);
  return (
    <Cart to="/shopping-cart">
        {itemsCount > 0 && (
          <CountContainer>
            <Count>{itemsCount}</Count>
          </CountContainer>
        )}
      <FiShoppingCart size={27} title="Shopping Cart" />
    </Cart>
  )
}

const Cart = styled(Link)`
  position: relative;
  display: flex;
  text-align: center;

  a svg {
    display: block;
    color: #333;
  }
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
