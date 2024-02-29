import React, { useState, useEffect } from 'react';
import useCart from '../../hooks/useCart';
import Item from '../../components/Item';
import Select from '../../components/Select';
import styled from 'styled-components';

const CartItem = ({ index, item, setLoading }) => {
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const { subTotal, cartItems, setCartItems } = useCart();


  useEffect(() => {
    const parsedPrice = parseFloat(item.selected.price)
    setTotal(parseFloat(item.quantity * parsedPrice))
    setPrice(parsedPrice)
  }, [subTotal]);

  const handleClick = () => {
    const items = [...cartItems]
    items.splice(index, 1);
    setCartItems(items);
  };

  return (
    <Item classList='cart-item'>
      <ImageContainer>
        <Image src={item.selected?.image_uris?.small} />
      </ImageContainer>
      <DetailsContainer>
        <DetailsHeader>
          <h3>{item.selected?.name}</h3>
          <p>$ {price.toFixed(2)}</p>
        </DetailsHeader>
        <Details>
          <Info>
            <p>Seller: {item.selected?.userName}</p>
            <p>Ships from: {item.selected?.country}</p>
            <p>Card Condition: {item.selected?.condition?.toUpperCase()}</p>
          </Info>
          {item?.quantity &&
            <Select className={'cart-item-quantity'} product={item.selected} quantity={item.quantity} setLoading={setLoading} />
          }
        </Details>
        <button type="button" onClick={handleClick}>Delete</button>
        <DetailsFooter>
          <h4>Total:</h4>
          <p>{item.quantity && `$ ${total.toFixed(2)}`}</p>
        </DetailsFooter>
      </DetailsContainer>
    </Item>
  )
}

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
