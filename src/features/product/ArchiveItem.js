import { useState, useEffect } from 'react';
import Container from '../../components/Container';
import ProductHeader from './components/ProductHeader';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import ProductDetails from './components/ProductDetails';
import ProductActions from './components/ProductActions';
import ProductImage from './components/ProductImage';
import Image from '../../components/Image';
import ExpandImgBtn from './components/ExpandImgBtn';
import Button from '../../components/Button';
import Loader from '../../layout/Loader';
import Drop from '../../components/Drop';
import useExpandImage from '../../hooks/useExpandImage';
import usePostData from '../../hooks/usePostData';
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import useProductMatch from '../../hooks/useProductMatch';
import { FaRegCheckCircle } from "react-icons/fa";

const ArchiveItem = ({ index, product, count, handleSlideView }) => {
  const [cardAdded, setCardAdded] = useState(false);

  const { auth } = useAuth();
  const { user, token } = auth;
  const query = `/api/cards/add/${user.id}/${product.id}`;

  const { postData, loading, result, error } = usePostData(product);
  const { setUpdateCollection } = useSearch();
  const { expandedImage } = useExpandImage(product);
  const { isProductMatch, isMatch } = useProductMatch();

  useEffect(() => {
    isProductMatch(product);
  }, []);

  useEffect(() => {
    // If card was successfully added
    if (result?.isCardAdded) {
      // Trigger update collection @layout/DashboardNav
      // to make new cardName available in search collection
      setCardAdded(true);
      setUpdateCollection(true);
    }
    if (error) {
      console.log(error)
    }
  }, [result, setUpdateCollection, error])

  return (
    <>
      <ProductHeader classList={'flex align-center space-between one'}>
        <Title classList={'product-title'} text={product.name} />
        <CountDown count={count} unit={index + 1} type={'Result'} />
      </ProductHeader>
      {loading && <Loader />}
      <ProductImage classList={'product-image two'}>
        <Image
          classList={'col-12'}
          product={product}
        />
        <ExpandImgBtn
          handleClick={handleSlideView}
          cardLayout={product.layout}
          expandedImage={expandedImage}
        />
        {
          (cardAdded || isMatch) &&
          <Drop classList={'bg-success'} >
            <span className='fs-100 fw-700'>Added</span>
          </Drop>
        }
      </ProductImage>
      <ProductDetails classList={'product-details three'}>
        {
          // details &&
          // details.map((detail, i) => {
          //     return (
          //         <Container key={i} classList={''}>
          //             <p><span className="">{detail.title}</span>  <span className="">{detail.value}</span></p>
          //         </Container>
          //     )
          // })
        }
      </ProductDetails >
      <ProductActions classList={'product-actions four'} >
        {
          (!cardAdded && !isMatch) &&
          <Button
            id={'add-product'}
            classList={'btn-small bg-primary'}
            title={'Add to '}
            handleClick={() => postData(token, query)}
          >
            {'Add to Collection'}
          </Button>
        }
      </ProductActions>
    </>
  )
}

export default ArchiveItem
