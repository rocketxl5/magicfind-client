import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from './components/ProductImage';
import ProductHeader from './components/ProductHeader';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import Container from '../../components/Container';
import QuantitySelector from './components/QuantitySelector';
import Button from '../../components/Button';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import Image from '../../components/Image';
import Avatar from '../../components/Avatar';
import Loader from '../../layout/Loader';
import search from '../../data/SEARCH.json';
import useViewport from '../../hooks/contexthooks/useViewport';
import useCart from '../../hooks/contexthooks/useCart';
import useUpdateCart from '../../hooks/useUpdateCart';
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = ({ index, count, item }) => {
  const [showCard, setShowCard] = useState(false);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const product = search.product;

  const url = `/api/catalog/${item.selected?.seller?.userID}/${item.selected._id}/`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const { isMobile } = useViewport();
  const { cartItems } = useCart();
  const { loading, updateCartHandler } = useUpdateCart(url, headers, item, index);

  useEffect(() => {
    setPrice(parseFloat(item.selected.price));
  }, []);

  useEffect(() => {
    setTotal(price * parseInt(cartItems[index].quantity));
  }, [price, setTotal, cartItems, index])

  const details = [
    {
      text: `${product.conditions[item.selected.condition]}`,
      style: 'product-detail product-condition'
    },
    {
      text: product.languages[item.selected.language],
      style: 'product-detail product-language'
    },
    {
      text: product.finishes[item.selected.finishes],
      style: 'product-detail product-finish'
    },
    // {
    //   text: `Sold by ${item.selected.seller.userName}`,
    //   style: 'product-detail product-seller'
    // },
    {
      text: `Ships from ${item.selected.seller.country}`,
      style: 'product-detail product-shipping'
    },
    {
      text: `${item.selected.quantity} in stock`,
      style: 'product-detail product-quantity'
    },
    {
      text: `Price $${price.toFixed(2)}`,
      style: 'product-detail product-price'
    },
    {
      text: `Total: $${total.toFixed(2)} (${cartItems[index]?.quantity} ${cartItems[index]?.quantity > 1 ? 'items' : 'item'})`,
      style: 'product-detail product-quantity'
    },
  ]

  return (
    <>
      <ProductHeader classList={'flex align-center space-between one'}>
        <Title classList={'product-title'}>
          {
            !isMobile || item.selected.name.length < 35 ?
              item.selected.name :
              `${item.selected.name.substring(0, 30)}...`
          }
        </Title>
        <CountDown count={count} unit={index + 1} type={'Result'} />
      </ProductHeader>
      {loading && <Loader />}
      <ProductImage classList={'product-image two'}>
        <Image
          classList={'col-12'}
          product={item.selected}
          handleClick={() => navigate(
            `/product/${item.selected._id}`,
            {
              state: { product: item.selected }
            })}
        />
      </ProductImage>
      <Container classList={'flex column space-between three'}>
        <List classList={'product-details'}>
        {
          details &&
          details.map((detail, i) => {
            return (
              <ListItem key={i} className={detail.style}>
                {detail.text}
              </ListItem>
            )
          })
        }
        </List>
        <div className='col-12 flex space-between'>
          {/* <label className='strong col-9 fs-125 text-center move-right d-block padding-bottom-1' htmlFor={`item${index}`}>Quantity Selected </label> */}
          <Button
            classList={'btn-tiny bg-danger'}
          handleClick={(e) => updateCartHandler(0)}
        >
            <AiOutlineDelete />
        </Button>
          <Container classList={'col-8 text-right dropdown'}>
        <QuantitySelector
              id={`item${index}`}
              classList={'col-12 move-right'}
          name={'cart-item'}
          quantitySelected={cartItems[index]?.quantity}
          quantityAvailable={item.selected.quantity}
          product={item.selected}
          handleChange={updateCartHandler}
        />

          </Container>
        </div>

      </Container>
    </>
  )
}

export default CartItem;