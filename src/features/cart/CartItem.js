import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Span from '../../components/Span';
import Image from '../../components/Image';
import Loader from '../../layout/Loader';
import useCart from '../../hooks/useCart';
import data from '../../data/SEARCH.json';

const CartItem = ({ index, item }) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const { subTotal, cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const { conditions, languages, finish } = data.product;
  const details = [
    {
      text: item.selected.name,
      style: 'item-detail item-name'
    },
    {
      text: `Sold by ${item.selected.userName}`,
      style: 'item-detail item-seller'
    },
    {
      text: `Ships from ${item.selected?.country}`,
      style: 'item-detail item-shipping'
    },
    {
      text: `${conditions[item.selected.condition]} condition`,
      style: 'item-detail item-condition'
    },
    {
      text: languages[item.selected.language],
      style: 'item-detail item-language'
    },
    {
      text: finish[item.selected.finishes],
      style: 'item-detail item-finish'
    },
    {
      text: price.toFixed(2),
      style: 'item-detail item-price'
    },
    {
      text: `${item.selected.quantity} ${item.selected.quantity > 1 ? 'items' : 'item'} in stock`,
      style: 'item-detail item-quantity'
    },
    {
      text: `${item.quantity} ${item.quantity > 1 ? 'items' : 'item'} selected`,
      style: 'item-detail item-quantity'
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
    <ListItem classList='cart-item'>
      <Container classList={'flex col-12 gap-1 p-relative'}>
        {loading && <Loader />}
        <Container id={'item-image'} classList={'item-image'} >

          <Image classList={'col-12'} url={item.selected.image_uris?.small} handleClick={() => navigate(`/product/${item.selected._id}`, { state: { product: item.selected } })} />

        </Container>
        <Container id={'item-details'} classList={'item-details'}>
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
          {/* <Container classList={''}>
            <p>{item.quantity && `Total: $ ${total.toFixed(2)}`}</p>

          </Container> */}
        </Container>

      </Container>
      <Container classList={'item-btns'}>
        <Button classList={'btn-small item-btn bg-danger'} handleClick={() => deleteItem()}>
          {'Remove'}
        </Button>
        <Button classList={'btn-small item-btn bg-primary'} title={'Add to wishlist'} handleClick={() => console.log('wishlist')}>
          {'Wishlist'}
        </Button>
        <Select classList={'dropdown item-dropdown'} name={'item'} product={item.selected} quantity={item.quantity} setLoading={(value) => setLoading(value)} />
      </Container>
    </ListItem>
  )
}

export default CartItem;
