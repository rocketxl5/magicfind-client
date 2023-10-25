/***************************/
/**** Skryfall API Card ****/
/***************************/

import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { CardContext } from '../../../contexts/CardContext';
// import { PathContext } from '../../../contexts/PathContext';
import CardImage from './CardImage';
import capitalizeWord from '../../utilities/capitalizeWord';

const SkryfallCard = (props) => {
  const { index, card, handleClick } = props;

  const handleMouseDown = (e) => {

  }

  return (
    <div id={`card-${index}`} key={index} className="card-container">
      <div className="card-section">
        <div className="card" onMouseDown={handleMouseDown}>
          <CardImage card={card} />
        </div>
      </div>
      <div className="card-section">
        <div className="card-specs">
          <div className="card-name">
            {card.name}
          </div>
          <div className="card-set">
            {card.set_name}
          </div>
          <div className="spec card-rarity">
            <p>
              {capitalizeWord(card.rarity)}
            </p>
          </div>
          <p>
            {card.type}
          </p>
          <div className="spec card-finish">
            <div className="finish">
              <p>{card.finishes[0] !== 'nonfoil' && capitalizeWord(card.finishes[0])}</p>
            </div>
          </div>
        </div>
        <div className="card-btns">
          <button id="cart-card" className="card-btn bg-green" type="button" onClick={(e) => handleClick(e, card, index)}>{!card.selected ? 'Select Card' : 'Selected'}</button>
        </div>
      </div>
    </div>
  );
};

export default SkryfallCard;
