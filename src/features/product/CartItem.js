import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from './components/ProductImage';
import ProductDetails from './components/ProductDetails';
import ProductActions from './components/ProductActions';
import QuantitySelector from './components/QuantitySelector';
import Button from '../../components/Button';
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
      text: item.selected.name,
      style: 'product-detail product-name'
    },
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
      {loading && <Loader />}
      <ProductImage classList={'product-image one'}>
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
      <ProductDetails classList={'product-details two'}>
        {
          details &&
          details.map((detail, i) => {
            return (
              <p key={i} className={detail.style}>
                {detail.text}
              </p>
            )
          })
        }
      </ProductDetails>
      <ProductActions classList={'product-actions three'}>
        <Button
          classList={'btn-small product-btn bg-danger'}
          handleClick={(e) => updateCartHandler(0)}
        >
          {'Delete'}
        </Button>
        {/* <Button
          classList={'btn-small product-btn bg-primary'}
          title={'Add to wishlist'}
          handleClick={() => console.log('wishlist')}
        >
          {'Wishlist'}
        </Button> */}
        <QuantitySelector
          classList={'dropdown product-dropdown'}
          name={'cart-item'}
          quantitySelected={cartItems[index]?.quantity}
          quantityAvailable={item.selected.quantity}
          product={item.selected}
          handleChange={updateCartHandler}
        />
      </ProductActions>
    </>
  )
}

export default CartItem;