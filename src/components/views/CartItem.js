import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';

const CartItem = ({ item, setIsUpdating }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, setCartItems } = useContext(ShoppingCartContext);

  const handleChange = (e, item) => {
    cartItems.forEach((cartItem) => {
      if (cartItem === item) {
        // console.log(e.target.value);
        cartItem.quantity_selected = parseInt(e.target.value);
      }

      setLoading(true);
      setIsUpdating(true);
      const options = {
        method: 'GET',
        header: { 'Content-Type': 'application/json' }
      };

      fetch(
        `/api/catalog/${item.name}/${item._id}/${item.quantity_selected}`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.isQuantityAvailable) {
            setLoading(false);
            setIsUpdating(false);
            setQuantity(cartItem.quantity_selected);
            const items = [...cartItems];
            setCartItems(items);
          } else {
            return console.log('Quantity not available');
          }
        });
    });
  };

  const handleClick = (item) => {
    cartItems.forEach((cartItem, index) => {
      if (cartItem === item) {
        cartItems.splice(index, 1);
      }

      const items = [...cartItems];
      setCartItems(items);
    });
  };
  return (
    <Content className={loading ? 'loading' : ''}>
      <ImageContainer>
        <Image src={item.image_uris.png} />
      </ImageContainer>
      <DetailsContainer>
        <DetailsHeader>
          <h3>{item.name}</h3>
          <p>$ {item.price}.00</p>
        </DetailsHeader>
        <Details>
          <Info>
            <p>Seller: {item.userName}</p>
            <p>Ships from: {item.userCountry}</p>
            <p>Card Condition: {item.condition.toUpperCase()}</p>
          </Info>
          <Selector>
            <select
              onChange={(e) => {
                handleChange(e, item);
              }}
            >
              {[...new Array(item.quantity)].map((x, i) => {
                return i + 1 === item.quantity_selected ? (
                  <option key={i} value={i + 1} selected>
                    {i + 1}
                  </option>
                ) : (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <button onClick={() => handleClick(item)}>Delete</button>
          </Selector>
        </Details>
        <DetailsFooter>
          <h4>Total:</h4>
          <p>{quantity && `$ ${item.quantity_selected * item.price}.00`}</p>
        </DetailsFooter>
      </DetailsContainer>
    </Content>
  );
};

const Info = styled.div``;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.9rem;
  width: 100%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  font-size: 0.8rem;
`;
const DetailsFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em 1em 0;
  border-top: 1px solid #e4e4e4;

  h4 {
    margin-right: 1em;
  }

  p {
    font-weight: 900;
  }
`;
const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em 1em 0.5em 0;
  border-bottom: 1px solid #e4e4e4;

  p {
    font-weight: 900;
  }
`;

const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10em;
  padding: 0.5em 0;

  select {
    padding: 0.2em;
    width: 4em;
  }

  button {
    padding: 0.5em 1em;
    color: #fff;
    background: #dc3545;
    border: 1px solid #dc3545;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em;
`;

const Items = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  display: flex;
  width: 100%;
  padding: 0 1em;
  background: #e1e8ed;
`;
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  background: #fff;
  height: 20vh;
  padding: 1em;
  margin: 4em 0 1em 1em;

  h3 {
    text-align: center;
    padding-bottom: em;
  }

  p {
  }
`;
const CheckoutButton = styled.button`
  width: 100%;
  padding: 1em 0;
  font-size: 1rem;

  background: #ffc107;
  border: none;
`;
const Content = styled.div`
  display: flex;
  margin-bottom: 1em;

  background: #fff;
  width: 100%;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  padding: 0.8em;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
export default CartItem;
