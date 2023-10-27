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
    <div id={`card-${index}`} key={card.id} className="card-container">
      <div className="card-body">
        <div className="card-section">
          <div className="card-image" >
            <CardImage card={card} />
          </div>
        </div>
        <div className="card-section">
          <div className="card-wrapper">
            <div className="card-name">
              <p><span>{card.name}</span></p>
            </div>
            <div className="card-info">
              <div className="card-set">
                <p>Set: <span>{card.set_name}</span></p>
              </div>
              <div className="card-release">
                <p>Year:  <span>{card.released_at.split('-')[0]}</span></p>
              </div>
              <div className="card-rarity">
                <p>Rarity:  <span>{capitalizeWord(card.rarity)}</span></p>
              </div>
              {
                card.finishes[0] !== 'nonfoil' &&
                <div className="card-finish">
                  <p>Finish:  <span className={card.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''}>{capitalizeWord(card.finishes[0])}</span></p>
                </div>
              }
              <div className="card-frame">
                <p>Frame:  <span>{card.frame}</span></p>
              </div>
              <div className="card-collector">
                <p>Collector #:  <span>{card.collector_number}</span></p>
              </div>
              <div className="card-artist">
                <p>Artist:  <span>{card.artist.split(',')[0]}</span></p>
              </div>
            </div>
          </div>
          <div className="card-btn-container">
            <button id="cart-card" className="card-btn bg-blue color-lg-grey" type="button" onClick={(e) => handleClick(e, card, index)}>{!card.selected ? 'Select' : 'Selected'}</button>
          </div>

        </div>
      </div>
    </div>
  )
}
export default APICard;
