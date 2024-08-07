import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductHeader from '../product/components/ProductHeader';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import Container from '../../components/Container';
import QuantitySelector from '../product/components/QuantitySelector';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Image from '../../components/Image';
import Avatar from '../../components/Avatar';
import Loader from '../../layout/Loader';
import data from '../../data/SEARCH.json';
import useViewportContext from '../../hooks/contexthooks/useViewportContext';
import useCartContext from '../../hooks/contexthooks/useCartContext';
import useUpdateCart from '../../hooks/useUpdateCart';
// import useAxios from '../../hooks/useAxios';
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = ({ index, count, product }) => {
  const [showCard, setShowCard] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(false)
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const url = `/api/catalog/${product.selected?.seller?.userID}/${product.selected._id}/`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const { isMobile } = useViewportContext();
  const { cartItems, cartUpdate } = useCartContext();
  // const {fetch} = useAxios();
  const { loading, quantityAvailable, currentStatus, updateCartHandler } = useUpdateCart(url, headers, product, index);

  useEffect(() => {
    if (!cartUpdate.length > 0) {
      updateCartHandler(product.quantity);
      setPrice(parseFloat(product.selected.price));
    }
  }, [cartUpdate]);

  useEffect(() => {
    setTotal(price * parseInt(cartItems[index].quantity));
  }, [price, setTotal, cartItems, index])

  // const details = [
  //   {
  //     text: `${data.product.conditions[product.selected.condition]}`,
  //     style: 'product-spec product-condition'
  //   },
  //   {
  //     text: data.product.languages[product.selected.language],
  //     style: 'product-spec product-language'
  //   },
  //   {
  //     text: data.product.finishes[product.selected.finishes],
  //     style: 'product-spec card-finish'
  //   },
  //   // {
  //   //   text: `Sold by ${product.selected.seller.userName}`,
  //   //   style: 'product-spec product-seller'
  //   // },
  //   {
  //     text: `Ships from ${product.selected.seller.country}`,
  //     style: 'product-spec product-shipping'
  //   },
  //   {
  //     text: `${product.selected.quantity} in stock`,
  //     style: 'product-spec product-quantity'
  //   },
  // ]

  return (
    <Card classList={'product-card grid'}>
      <ProductHeader classList={'flex align-center space-between one'}>
        <Title classList={'product-title'}>
          {
            !isMobile || product.selected.name.length < 35 ?
              product.selected.name :
              `${product.selected.name.substring(0, 30)}...`
          }
        </Title>
        <CountDown count={count} unit={index + 1} type={'Result'} />
      </ProductHeader>
      <div className='relative two'>
        <Image
          product={product.selected}
          classList='relative cart-item-image '
          handleClick={() => navigate(
            `/product/${product.selected._id}`,
            {
              state: { product: product.selected }
            })}
        />
      </div>

      <Container classList={' three'}>
        {/* {
          currentStatus &&
          <p className='bg-primary color-light fs-100 text-center padding-block-1'>{currentStatus?.message}</p>
        } */}
        {/* <List classList={'product-specs'}>
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
        </List> */}

      </Container>
      <div className='four'>

        <table className='cart-price'>
          <tbody>
            <tr>
              <td>Price:</td>
              <td>${price.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Quantity: </td>
              <td>{cartItems[index]?.quantity}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className='flex flex-end gap-1 margin-top-2'>
          {/* <label className='strong col-9 fs-125 text-center push-right d-block padding-bottom-1' htmlFor={`item${index}`}>Quantity Selected </label> */}
          {/* <div className=''> */}
          {
            loading ? <Loader classList={'cart-loader relative box-size-6 bg-transparent'} /> :
              <Button
                classList={'btn box-size-6 btn-tiny bg-danger color-light'}
                handleClick={(e) => updateCartHandler(0)}
              >
                <AiOutlineDelete />
              </Button>
          }
          {/* </div> */}
          <Container classList={'col-9 text-right dropdown'}>
            <QuantitySelector
              id={`item${index}`}
              classList={'col-12'}
              name={'cart-item'}
              quantitySelected={cartItems[index]?.quantity}
              quantityAvailable={quantityAvailable}
              product={product.selected}
              handleChange={updateCartHandler}
            />
          </Container>
        </div>
      </div>
    </Card>
  )
}

export default CartItem;