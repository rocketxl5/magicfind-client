/******************************/
/**** User Collection Card ****/
/******************************/


import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CardContext } from '../../../contexts/CardContext';
import CardImage from './CardImage';

const CollectionCard = ({ card }) => {
  const { setCardContext } = useContext(CardContext);
  const history = useHistory();

  // Remove card from user store
  // Should also remove user from card uers array in database

  const handleClick = (e) => {
    setCardContext(true);
    history.push({
      pathname: `${e.target.id}/${card.name}`,
      state: {
        data: card
      }
    });
  }

  return (
    <div className="item-container">

      <div className="item-image">
        <CardImage card={card} />
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
        <button id="modify-card" className="item-btn bg-green" onClick={handleClick}>
          Modify
        </button>

        <button id="remove-card" className="item-btn bg-red" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
