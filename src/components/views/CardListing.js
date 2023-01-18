import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiArrowLeftCircle } from 'react-icons/fi';

import { CardContext } from '../../contexts/CardContext';
import { PathContext } from '../../contexts/PathContext';
import styled from 'styled-components';

const CardListing = ({ card, setIsSent }) => {
  const location = useLocation();
  const [cardCondition, setCardCondition] = useState('nm');
  const [cardLanguage, setCardLanguage] = useState('en');
  const [quantity, setQuantity] = useState(1);
  const [cardPrice, setCardPrice] = useState(0);
  const [comment, setComment] = useState('');
  const { setCardContext } = useContext(CardContext);
  const { path, setPath } = useContext(PathContext);

  useEffect(() => {
    setPath(location.pathname.split('/')[1]);
  }, []);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleClick = (e) => {
    if (e.currentTarget.id === 'add') {
      setQuantity(parseInt(quantity) + 1);
    } else if (e.currentTarget.id === 'remove' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const clearFields = () => {
    setCardCondition('');
    setCardLanguage('');
    setQuantity('');
    setCardPrice('');
    setComment('');
  };

  // If current view is modify-card
  useEffect(() => {
    if (path === 'modify-card') {
      setCardCondition(card.condition);
      setCardLanguage(card.language);
      setQuantity(card.quantity);
      setCardPrice(card.price);
      setComment(card.comment);
    }
  }, [path]);

  return (
    <Fragment>
      <h2>Product Details</h2>
      <header className="search-header">
        {path === 'add-card' ? (
          <GoBack to={'/search-api'} title="Back To Search">
            <BackIcon>
              <FiArrowLeftCircle size={26} />
            </BackIcon>
            <BackText>Back to Search</BackText>
          </GoBack>
        ) : (
          <GoBack to={'/store'} title="Back To Store">
            <BackIcon>
              <FiArrowLeftCircle size={26} />
            </BackIcon>
            <BackText>Back to Store</BackText>
          </GoBack>
        )}

        <span>
          {`${card.name.charAt(0).toUpperCase()}${card.name
            .substring(1)
            .toLowerCase()}`}
        </span>
      </header>

      <div className="item-container">
        <div className="item-info">
          <div className="item-image">
            <img id="item-image" src={card.image_uris && card.image_uris.png} />
          </div>

          <div className="item-details">
            {path === 'add-card' ? (
              <Fragment>
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
                  <strong>Rarity</strong>: {capitalize(card.rarity)}
                </p>
                <p>
                  <strong>Year</strong>: {card.frame}
                </p>
              </Fragment>
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="add-card-form">
        <div className="form-element">
          <label htmlFor="condition">Pick a condition: </label>
          <Select
            id="condition"
            name="condition"
            value={cardCondition}
            onChange={(e) => setCardCondition(e.target.value)}
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
            value={cardLanguage}
            onChange={(e) => setCardLanguage(e.target.value)}
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
          <Quantity>
            <Circles
              id="remove"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <FiMinusCircle size={23} />
            </Circles>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />{' '}
            <Circles
              id="add"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <FiPlusCircle size={23} />
            </Circles>
          </Quantity>
        </div>
        <div className="form-element">
          <label htmlFor="negotiable">Asking Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={cardPrice}
            onChange={(e) => {
              setCardPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-element">
          <label htmlFor="comment">Comments: </label>
          <Comment
            id="comment"
            name="information"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Additionnal information"
          ></Comment>
          <div className="item-buttons push-right">
            <button
              className="item-button success"
              onClick={(e) => {
                e.preventDefault();
                card.condition = cardCondition;
                card.language = cardLanguage;
                card.quantity = quantity;
                card.price = cardPrice;
                card.comment = comment;
                setIsSent(true);
              }}
            >
              {path === 'add-card' ? 'Add To Store' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Container = styled.div`
  height: 80vh;
`;

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
