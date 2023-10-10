import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CardContext } from '../../contexts/CardContext';
import Image from './Image';
import styled from 'styled-components';

const StoreItem = ({ card }) => {
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

        <div className="item-image">
          <Image card={card} />
        </div>
      <div className="item-info">
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


      <div className="item-btns">
        <button className="item-btn bg-green" onClick={setModification}>
          Modify
        </button>

        <button className="item-btn bg-red" onClick={setRemoval}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StoreItem;
