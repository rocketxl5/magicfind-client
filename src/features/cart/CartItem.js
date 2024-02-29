import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import Item from '../../components/Item';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Select from '../../components/Select';
import Span from '../../components/Span';
import Image from '../../components/Image';
import useCart from '../../hooks/useCart';
import data from '../../data/SEARCH.json';

const CartItem = ({ index, item, setLoading }) => {
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const { subTotal, cartItems, setCartItems } = useCart();
  const { conditions, languages, finish } = data.product

  const details = [
    {
      text: 'Seller:',
      value: item.selected?.userName
    },
    {
      text: 'Location:',
      value: item.selected?.country
    },
    {
      text: 'Condition:',
      value: conditions[item.selected.condition]
    },
    {
      text: 'Language:',
      value: languages[item.selected.language]
    },
    {
      text: 'Finish:',
      value: finish[item.selected.finishes]
    },
  ]

  useEffect(() => {
    const parsedPrice = parseFloat(item.selected.price)
    setTotal(parseFloat(item.quantity * parsedPrice))
    setPrice(parsedPrice)
  }, [subTotal]);

  const deleteItem = () => {
    const items = [...cartItems]
    items.splice(index, 1);
    setCartItems(items);
  };

  return (
    <Item classList='cart-item'>
      <Header classList={'item-header'}>
        <p>{item.selected?.name}</p>
        <p>$ {price.toFixed(2)}</p>
      </Header>
      <Container classList={'flex col-12 gap-1'}>
        <Container id={'item-image'} classList={'item-image flex-grow-1'}>
          <Image classList={''} url={item.selected.image_uris?.small} />
        </Container>
        <Container id={'item-details'} classList={'flex flex-column space-between col-12'}>
          <Container classList={'flex flex-column'}>
            {
              details &&
              details.map((detail, i) => {
                return (
                  <Span key={i} classList={'item-detail'}>
                    {`${detail.text} ${detail.value}`}
                  </Span>
                )
              })
            }
          </Container>
          <Container classList={'flex space-between col-12 gap-2'}>
            {item?.quantity &&
              <Select className={'item-select'} product={item.selected} quantity={item.quantity} setLoading={setLoading} />
            }
            <Button classList={'item-btn'} handleClick={() => deleteItem()}>
              {'Delete'}
            </Button>
          </Container>
          <Footer classList={'flex flex-end align-center col-12'}>
            <p>Total:</p>
          <p>{item.quantity && `$ ${total.toFixed(2)}`}</p>
          </Footer>
        </Container>
      </Container>
    </Item>
  )
}

export default CartItem;
