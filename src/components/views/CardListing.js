import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiArrowLeftCircle } from 'react-icons/fi';
import Image from './search/CardImage';
import { SearchContext } from '../../contexts/SearchContext';
import { PathContext } from '../../contexts/PathContext';
import capitalizeString from '../../utilities/capitalizeString';
import styled from 'styled-components';

const CardListing = ({ card, setIsSent }) => {
  const location = useLocation();
  const [condition, setCondition] = useState('nm');
  const [language, setLanguage] = useState('en');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const { setSentForm } = useContext(SearchContext);
  const { path, setPathname } = useContext(PathContext);

  const form = useRef(null);

  useEffect(() => {
    setPathname(location.pathname.split('/')[1]);
  }, []);

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'condition':
        setCondition(e.target.value)
        break;
      case 'language':
        setLanguage(e.target.value)
        break;
      case 'quantity':
        setQuantity(e.target.value);
        break;
      case 'price':
        setPrice(e.target.value);
        break;
      case 'comment':
        setComment(e.target.value);
        break;
      default:
        setIsPublished(!isPublished);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentForm(form.current.id);
    card.condition = condition;
    card.language = language;
    card.quantity = quantity;
    card.price = price;
    card.comment = comment;
    card.isPublished = isPublished;
    card.datePublished = isPublished ? Date.now() : '';
    console.log(card)
    setIsSent(true);
  }


  // If current view is modify-card
  useEffect(() => {
    if (path === 'modify-card') {
      setCondition(card.condition);
      setLanguage(card.language);
      setQuantity(card.quantity);
      setPrice(card.price);
      setComment(card.comment);
      setIsPublished(card.isPublished);
    }
  }, [path]);

  return (
    <>
      <header className="search-header">
        <h2>Product Details</h2>
        {path === 'add-card' ? (
          <GoBack to={'/search-api'} title="Back To API">
            <BackIcon>
              <FiArrowLeftCircle size={26} />
            </BackIcon>
            <BackText>Back to Search</BackText>
          </GoBack>
        ) : (
            <GoBack to={'/search-collection'} title="Back To Collection">
            <BackIcon>
              <FiArrowLeftCircle size={26} />
            </BackIcon>
            <BackText>Back to Store</BackText>
          </GoBack>
        )}

        <span>
          {capitalizeString(card.name)}
        </span>
      </header>

      <div className="card-content">
        <div className="card">
          <div className="card-image">
            <Image card={card} />
          </div>

          <div className="card-info">
            {path === 'add-card' ? (
              <>
                <p>
                  <strong>Name</strong>: {card.name}
                </p>
                <p>
                  <strong>Market Price</strong>: ${card.prices.usd} USD
                </p>
                <p>
                  <strong>Foil</strong>: {card.foil ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Type</strong>: {card.type_line}
                </p>
                <p>
                  <strong>Set</strong>: {card.set_name}
                </p>
                <p>
                  <strong>Rarity</strong>: {capitalizeString(card.rarity)}
                </p>
                <p>
                  <strong>Year</strong>: {card.frame}
                </p>
              </>
            ) : (
                <>
                <p>
                  <strong>Name</strong>: {card.name}
                </p>
                <p>
                  <strong>Asking Price</strong>: ${card.price}
                </p>
                <p>
                  <strong>Foil</strong>: {card.foil ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Condition</strong>: {card.condition}
                </p>
                <p>
                  <strong>Set</strong>: {card.set_name}
                </p>
                <p>
                  <strong>Artist</strong>: {card.artist}
                </p>
                <p>
                  <strong>Year</strong>: {card.frame}
                </p>
                </>
            )}
          </div>
        </div>
      </div>
      <div className="add-card-form">
        <form id="add-update" className="cardlist-form" onSubmit={handleSubmit} ref={form}>
        <div className="form-element">
          <label htmlFor="condition">Pick a condition: </label>
          <Select
            id="condition"
            name="condition"
              value={condition}
              onChange={handleChange}
          >
            <option value="nm">Near Mint</option>
            <option value="sp">Slightly Played</option>
            <option value="m">Moderate</option>
            <option value="hp">Heavy Played</option>
            <option value="d">Dammaged</option>
          </Select>
        </div>
        <div className="form-element">
          <label htmlFor="condition">Card language: </label>
          <Select
            id="condition"
            name="condition"
              value={language}
              onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
            <option value="zhs">Simplified Chinese</option>
            <option value="zht">Traditional Chinese</option>
            <option value="ph">Phyrexian</option>
          </Select>
          </div>
        <div className="form-element">
          <label htmlFor="quantity">Quantity:</label>
            <Select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Select>
        </div>
        <div className="form-element">
            <label htmlFor="price">Asking Price</label>
            <Price>
          <input
                type="number"
            id="price"
            name="price"
                value={price}
                onChange={handleChange}
                min="1"
                max="1000"
          />
            </Price>
        </div>
        <div className="form-element">
          <label htmlFor="comment">Comments: </label>
          <Comment
            id="comment"
              name="comment"
            value={comment}
              onChange={handleChange}
            placeholder="Additionnal information"
          ></Comment>
          </div>
          <div className="form-element">
            <input type="checkbox" name="published" id="published" className="d-none" onChange={handleChange} />
            <p>Card Status:</p>
            <label htmlFor="published">
              {isPublished ? 'Unpublished' : 'Published'}
            </label>
          </div>
          <div className="form-element">
          <div className="item-buttons push-right">
              <button type="submit" className="item-button success">
              {path === 'add-card' ? 'Add To Store' : 'Save Changes'}
            </button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

const GoBack = styled(Link)`
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;
const BackIcon = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BackText = styled.span`
  margin-left: 20px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 3px;
  font-size: 1em;
`;
const Comment = styled.textarea`
  display: block;
  width: 100%;
  height: 15vh;
  font-size: 0.9em;
  font-family: sans-serif;
`;

const Price = styled.div`
  width: 100%;
`;

const Quantity = styled.div`
  display: flex;
  justify-context: center;
  align-items: center;
`;
const Circles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default CardListing;
