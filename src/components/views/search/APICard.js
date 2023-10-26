/***************************/
/**** Skryfall API Card ****/
/***************************/

import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { CardContext } from '../../../contexts/CardContext';
// import { PathContext } from '../../../contexts/PathContext';
import CardImage from './CardImage';
import capitalizeWord from '../../utilities/capitalizeWord';

const APICard = (props) => {
  const { index, card, handleClick } = props;
  return (
    <div id={`card-${index}`} key={index} className="card-container">
      <header className="card-header">
        <div className="card-name">
          <h4>{card.name} / {card.set_name}</h4>
        </div>
      </header>
      <div className="card-body">
        <div className="card-section">
          <div className="card-image" >
            <CardImage card={card} />
          </div>
        </div>
        <div className="card-section">
          <div className="card-specs">
            <div className="card-spec card-release">
              <p>Year:  <span>{card.released_at.split('-')[0]}</span></p>

            </div>
            <div className="card-spec card-rarity">
              <p>Rarity:  <span>{capitalizeWord(card.rarity)}</span></p>
            </div>
            {
              card.finishes[0] !== 'nonfoil' &&
              <div className="card-spec card-finish">
                <p>Finish:  <span>{capitalizeWord(card.finishes[0])}</span></p>
              </div>
            }
            <div className="card-btns">
              <button id="cart-card" className="card-btn bg-green" type="button" onClick={(e) => handleClick(e, card, index)}>{!card.selected ? 'Select' : 'Selected'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default APICard;
