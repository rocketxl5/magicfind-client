import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CardContext } from '../../contexts/CardContext';
import styled from 'styled-components';

const StoreItem = ({ card, setRemoveCard, setModifyCard }) => {
  const { user } = useContext(UserContext);
  const { setCardContext } = useContext(CardContext);
  const token = user.token;
  const userEmail = user.email;
  const history = useHistory();

  // Remove card from user store
  // Should also remove user from card uers array in database
  const setRemoval = () => {
    setCardContext(true);
    history.push({
      pathname: '/remove-card',
      state: {
        data: card
      }
    });
  };

  const setModification = () => {
    setCardContext(true);
    history.push({
      pathname: '/modify-card',
      state: {
        data: card
      }
    });
  };

  return (
    <div className="item-container">
      <div className="item-info">
        <div className="item-image">
          <img id="item-image" src={card.image_uris && card.image_uris.png} />
        </div>

        <div className="item-details">
          <p>{card.set_name}</p>

          <p>
            Condition: <strong>{card.condition.toUpperCase()}</strong>
          </p>
          <p>
            Quantity: <strong>{card.quantity}</strong>
          </p>
          <p>
            Language: <strong>{card.language.toUpperCase()}</strong>
          </p>
          <p>
            Price: <strong>{card.price}</strong>
          </p>
        </div>
      </div>

      <div className="item-buttons">
        <button className="item-button success" onClick={setModification}>
          Modify
        </button>

        <button className="item-button danger" onClick={setRemoval}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StoreItem;
