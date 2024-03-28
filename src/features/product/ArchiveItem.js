import { useState, useEffect } from 'react';
import Container from '../../components/Container';
import ProductHeader from './components/ProductHeader';
import Title from '../../components/Title';
import CountDown from '../search/components/CountDown';
import ProductImage from './components/ProductImage';
import Image from '../../components/Image';
import ExpandImgBtn from './components/ExpandImgBtn';
import Button from '../../components/Button';
import Loader from '../../layout/Loader';
import Confirmation from './components/Confirmation';
import Drop from '../../components/Drop';
import Alert from './components/Alert';
import useExpandImage from '../../hooks/useExpandImage';
import usePostData from '../../hooks/usePostData';
import useViewport from '../../hooks/contexthooks/useViewport';
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import useFind from '../../hooks/useFind';
import useColorSymbols from '../../hooks/useColorSymbols';
import { GoStack } from "react-icons/go";

import data from '../../data/SEARCH.json';

const ArchiveItem = ({ index, product, search, count, handleSlideView }) => {
  const [isCardAdded, setIsCardAdded] = useState(false);

  const { auth } = useAuth();
  const { user, token } = auth;
  const {
    artist,
    collector_number,
    finishes,
    layout,
    prices,
    rarity,
    released_at,
    set_name,
    type_line,
  } = product;
  const { postData, loading, showConfirmation, result, error } = usePostData(product);
  const { colorIdentity, manaCost } = useColorSymbols(product);
  const { setUpdateCollection } = useSearch();
  const { expandedImage } = useExpandImage(product);
  const { isMobile } = useViewport();
  const { findMatch, isMatchFound } = useFind();

  const query = `/api/cards/add/${user.id}/${product.id}`;

  // Sets card price according to card finish
  const setPrice = (prices, finish) => {
    let price;
    switch (finish) {
      case 'foil':
        price = prices.usd_foil;
        break;

      case 'etched':
        price = prices.usd_etched;
        break;
      case 'nonfoil':
        price = prices.usd;
        break;
      default:
        price = null
    }

    return price ? price : 'Unavailable';
  }

  useEffect(() => {
    findMatch(product);
    console.log(isMatchFound)
  }, []);

  useEffect(() => {
    // If card was successfully added
    if (result?.isCardAdded) {
      // Trigger update collection @layout/DashboardNav
      // to make new cardName available in search collection
      setIsCardAdded(true);
      setUpdateCollection(true);
    }
    if (error) {
      console.log(error)
    }
  }, [result, setUpdateCollection, error]);

  const details = [
    {
      title: 'Edition:',
      value: set_name
    },
    {
      title: 'Year:',
      value: `${released_at?.split('-')[0]}`
    },
    {
      title: 'Finish:',
      value: data.product.finishes[finishes]
    },
    {
      title: 'Rarity:',
      value: `${rarity.charAt(0).toUpperCase()}${rarity.substring(1)}`
    },
    {
      title: 'Collector #:',
      value: collector_number
    },
    {
      title: 'Price (US):',
      value: `$${setPrice(prices, finishes[0])}`
    },
    type_line ?
      {
        title: 'Type:',
        value:
          !type_line?.includes('—') ? (
            <td>{type_line}</td>
          ) : (
            <td>{type_line?.split('—')[0]}</td>
          )
      } : '',
    {
      title: 'Identity:',
      value: colorIdentity.length ? colorIdentity.map((color) => color) : 'Colorless'
    },
    {
      title: 'Cost:',
      value: manaCost && manaCost.map((color) => color)
    },
    {
      title: !artist.includes('&') ? 'Artist:' : 'Artists:',
      value: artist
    },
    // If card is two sided
    layout === 'reversible_card' &&
    {
      title: 'Layout:',
      value: 'Two sided card'
    },
  ];

  return (
    <>
      <ProductHeader classList={'flex align-center space-between one'}>
        <Title classList={'product-title'}>
          {
            !isMobile || product.name.length < 35 ?
              product.name :
              `${product.name.substring(0, 30)}...`
          }
        </Title>
        <CountDown count={count} unit={index + 1} type={'Result'} />
      </ProductHeader>
      {loading && <Loader />}
      {showConfirmation && <Confirmation message={!error ? 'Card Successfuly Added' : 'An Error Occured'} isSuccess={!error ? true : false} />}
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
          (isCardAdded || isMatchFound) &&
          <Drop classList={'bg-success absolute'} >
              <GoStack />
          </Drop>
        }
      </ProductImage>
      <Container classList={'product-details flex column space-between three'}>
        <div>
          {details &&
            details.map((detail, i) => {
              return (
                <Container key={i}>
                  <p><span className="">{detail.title}</span>  <span className="">{detail.value}</span></p>
                </Container>
              )
            })}
        </div>
        {(!isCardAdded && !isMatchFound) ?
          <div>
          <Button
            id={'add-product'}
              classList={'btn bg-success col-12'}
            title={'Add to '}
            handleClick={() => postData(token, query)}
          >
              {'Add'}
          </Button>
          </div>
          :
          <Alert>
            {/* <p className='border-dark padding-dot-5 b-radius-5 fs-100'>This card is in your collection</p> */}
          </Alert>
        }

      </Container >
    </>
  )
}

export default ArchiveItem
