import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Span from '../../components/Span';
import Image from '../../components/Image';
import Avatar from '../../components/Avatar';
import Loader from '../../layout/Loader';
import search from '../../data/SEARCH.json';
import useCart from '../../hooks/contexthooks/useCart';
import useUpdateCart from '../../hooks/useUpdateCart';

const CartItem = ({ index, item }) => {
  const [showCard, setShowCard] = useState(false);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const product = search.product;

  const url = `/api/catalog/${item.selected?.seller?.userID}/${item.selected._id}/`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const { dispatch, cartItems } = useCart();

  const { loading, updateCartHandler } = useUpdateCart(url, headers, item, index);

  useEffect(() => {
    console.log(item)
    setPrice(parseFloat(item.selected.price));
  }, []);

  useEffect(() => {
    setTotal(price * parseInt(cartItems[index].quantity));
  }, [cartItems])

  const details = [
    {
      text: item.selected.name,
      style: 'item-detail item-name'
    },
    // {
    //   text: `Sold by ${item.selected.userName}`,
    //   style: 'item-detail item-seller'
    // },
    // {
    //   text: `Ships from ${item.selected?.country}`,
    //   style: 'item-detail item-shipping'
    // },
    {
      text: `${product.conditions[item.selected.condition]}`,
      style: 'item-detail item-condition'
    },
    {
      text: product.languages[item.selected.language],
      style: 'item-detail item-language'
    },
    {
      text: product.finish[item.selected.finishes],
      style: 'item-detail item-finish'
    },
    {
      text: `${item.selected.quantity}  in stock`,
      style: 'item-detail item-quantity'
    },
    {
      text: `Price $${price.toFixed(2)}`,
      style: 'item-detail item-price'
    },
    {
      text: `Total: $${total.toFixed(2)} (${cartItems[index]?.quantity} ${cartItems[index]?.quantity > 1 ? 'items' : 'item'})`,
      style: 'item-detail item-quantity'
    },
  ]

  const deleteItem = () => {
    const items = [...cartItems]
    items.splice(index, 1);
    dispatch({
      type: 'delete-item',
      payload: items
    })
  };

  return (
    <>
      {
        // showCard &&
        // <Card classList={'bg-danger user-card'} data={item.selected.seller} handleClick={() => setShowCard(false)}>
        //   <h3>{item.selected.seller.userName}</h3>
        // </Card>
      }
      {loading && <Loader />}
      {/* <Avatar
          classList={'item-seller'}
          avatar={item.selected.seller.avatar}
          handleClick={() => setShowCard(true)}
        /> */}
      <Container id={'item-image'} classList={'item-image one'} >
        <Image
          classList={'col-12'}
          url={item.selected.image_uris?.small}
          handleClick={() => navigate(
            `/product/${item.selected._id}`,
            {
              state: { product: item.selected }
            })} />
      </Container>
      <Container id={'item-details'} classList={'item-details two'}>
        <Container classList={'flex flex-column'}>
          {
            details &&
            details.map((detail, i) => {
              return (
                <Span key={i} classList={detail.style}>
                  {detail.text}
                </Span>
              )
            })
          }
        </Container>
      </Container>
      <Container classList={'item-btns three'}>
        <Button
          classList={'btn-small item-btn bg-danger'}
          handleClick={() => deleteItem()}
        >
          {'Remove'}
        </Button>
        <Button
          classList={'btn-small item-btn bg-primary'}
          title={'Add to wishlist'}
          handleClick={() => console.log('wishlist')}
        >
          {'Wishlist'}
        </Button>
        <Select
          classList={'dropdown item-dropdown'}
          name={'cart-item'}
          quantitySelected={cartItems[index]?.quantity}
          quantityAvailable={item.selected.quantity}
          product={item.selected}
          handleChange={updateCartHandler}
        />
      </Container>
    </>
  )
}

export default CartItem;