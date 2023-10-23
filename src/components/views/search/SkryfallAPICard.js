/***************************/
/**** Skryfall API Card ****/
/***************************/

import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { CardContext } from '../../../contexts/CardContext';
// import { PathContext } from '../../../contexts/PathContext';
import CardImage from './CardImage';
import styled from 'styled-components';

const SkryfallAPICard = ({ index, card, handleMouseDown }) => {

  return (
    <div id={index} className="card-container" onMouseDown={(e) => handleMouseDown(e, index, card)}>
      <div className="card">
        <div className="card-image">
          <CardImage card={card} />
        </div>

        <div className="card-specs">
          <p>
            <strong>{card.set_name}</strong>
          </p>

          <p>
            <strong>
              {card.rarity} &bull; #{card.collector_number}
            </strong>
          </p>
          <p>
            <strong>{card.set_name}</strong>
          </p>
          {card.prices.usd ? (
            <p>
              Market Price: <strong>${card.prices.usd}</strong>
            </p>
          ) : (
            <p>Market Price: Unavailable</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkryfallAPICard;
