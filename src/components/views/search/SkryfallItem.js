import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CardContext } from '../../../contexts/CardContext';
import { PathContext } from '../../../contexts/PathContext';
import Image from '../Image';
import styled from 'styled-components';

const Card = ({ card }) => {
  const { setCardContext } = useContext(CardContext);
  const history = useHistory();

  const handleClick = () => {
    setCardContext(true);
    // localStorage.setItem('card', true);

    history.push({
      pathname: `/add-card/${card.name.toLowerCase()}`,
      state: { data: card },
    });
  };

  return (
    <div className="item-container">
      <div className="item-info">
        <div className="item-image">
          <Image card={card} />
        </div>

        <div className="item-details">
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
      <div className="item-buttons push-right">
        <button className="item-button success" onClick={handleClick}>
          Select Card
        </button>
      </div>
    </div>
  );
};

export default Card;
