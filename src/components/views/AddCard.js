import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardListing from './CardListing';
import useAuth from '../../hooks/useAuth';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';
import capitalizeString from '../utilities/capitalizeString';

const AddCard = () => {
  const location = useLocation();
  const [isSent, setIsSent] = useState(false);

  const { user } = useAuth;
  const { setCardContext } = useContext(CardContext);
  const card = location.state.data;


  // Add a cord to user store
  useEffect(() => {
    console.log('add card')
    console.log('isSent', isSent)
    if (isSent) {
      const newCard = {
        skryfallID: card.id,
        name: card.name,
        type_line: card.type_line,
        set_name: card.set_name,
        rarity: capitalizeString(card.rarity),
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
        isPublished: card.isPublished,
        datePublished: card.datePublished
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('auth-token', user.token);

      const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newCard),
      };
      fetch(`${api.serverURL}/api/cards`, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCardContext(false);
          setIsSent(false);
        })
        .catch((error) => console.log(error));
    }
  }, [isSent]);

  return <CardListing card={card} setIsSent={setIsSent} />;
};

export default AddCard;
