import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../contexts/CartContext';
import { api } from '../../api/resources';

const CartItem = ({ item, index, setLoading }) => {
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [total, setTotal] = useState(0)
  const { setCartItems } = useContext(CartContext);

  const handleChange = (e) => {

    const value = parseInt(e.target.value);
    // If value is 0
    if (!value) {
      // Delete item
      const items = JSON.parse(localStorage.getItem('cart'));
      items.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(items));
      setCartItems(items);
      return;
    }

    setQuantitySelected(value);
    setLoading(true);
    const options = {
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
    };

    fetch(
      `${api.serverURL}/api/catalog/${item.selected.userID}/${item.selected._id}/${value}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.isAvailable) {
          setLoading(false);
          const items = JSON.parse(localStorage.getItem('cart'));
          items[index].quantity = value
          setTotal(value * data.card._price);
          setCartItems(items);
        } else {
          setQuantitySelected(item.quantity);
        }
      })
      .catch((error) => {
        console.log(error.message)
      })

  };

  const deleteItem = (e) => {
    e.stopPropagation();
    const items = JSON.parse(localStorage.getItem('cart'));
    items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  useEffect(() => {
    setQuantitySelected(item.quantity)
    setTotal(item.quantity * item.selected.price)
  }, []);


  return (
    <Content>
      <ImageContainer>
        <Image src={item.selected.image_uris.small} />
      </ImageContainer>
      <DetailsContainer>
        <DetailsHeader>
          <h3>{item.selected.name}</h3>
          <p>$ {item.selected.price}.00</p>
        </DetailsHeader>
        <Details>
          <Info>
            <p>Seller: {item.selected.userName}</p>
            <p>Ships from: {item.selected.country}</p>
            <p>Card Condition: {item.selected.condition.toUpperCase()}</p>
          </Info>
          {item.quantity &&
          <Selector>
              <select
              name="quantity"
              value={quantitySelected}
              onChange={(e) => handleChange(e)}
            >

                {[...Array(item.selected.quantity + 1).keys()].map((key) => {
                return (
                  <option key={key} value={`${key}`}>
                    {key}
                  </option>
                )
              })}
            </select>

            <button type="button" onClick={deleteItem}>Delete</button>
          </Selector>
          }
        </Details>
        <DetailsFooter>
          <h4>Total:</h4>
          <p>{item.quantity && `$ ${total}.00`}</p>
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
