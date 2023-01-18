import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import CardListing from './CardListing';

import { UserContext } from '../../contexts/UserContext';
import { CardContext } from '../../contexts/CardContext';
import { PathContext } from '../../contexts/PathContext';
import styled from 'styled-components';

const AddCard = () => {
  const location = useLocation();
  const history = useHistory();
  const [isSent, setIsSent] = useState(false);
  const [card, setCard] = useState(location.state.detail);

  const { user } = useContext(UserContext);
  const { setCardContext } = useContext(CardContext);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // Add a cord to user store
  useEffect(() => {
    if (isSent) {
      const newCard = {
        skryfallID: card.id,
        name: card.name,
        type_line: card.type_line,
        set_name: card.set_name,
        rarity: capitalize(card.rarity),
        image_uris: card.image_uris,
        artist: card.artist,
        frame: card.frame,
        condition: card.condition,
        language: card.language,
        foil: card.foil,
        quantity: parseInt(card.quantity),
        price: parseFloat(card.price),
        comment: card.comment,
        userName: user.name,
        userCountry: user.country,
        userID: user.id,
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('auth-token', user.token);

      const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newCard),
      };
      fetch('/api/cards', options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCardContext(false);
          history.push('/search-api');
        })
        .catch((error) => console.log(error));
    }
  }, [isSent]);

  return <CardListing card={card} setIsSent={setIsSent} />;
};

export default AddCard;
