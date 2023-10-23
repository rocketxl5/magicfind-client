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
    <div className="card-container">
      <div className="card">
        <div className="card-image">
        <CardImage card={card} />
      </div>
        <div className="card-specs">
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
      <div className="card-btns">
        <button id="modify-card" className="card-btn bg-teal" type="button" onClick={handleClick}>
          Edit
        </button>

        {!card.isPublishd ? (

          <button id="publish-card" className="card-btn bg-green" type="button" onClick={handleClick}>Publish</button>
        ) : (
            <button id="unpublish-card" className="card-btn bg-yellow" type="button" onClick={handleClick}>Unpublish</button>

        )}

        < button id="remove-card" className="card-btn bg-red" type="button" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
