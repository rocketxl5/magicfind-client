import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardListing from './CardListing';
import { UserContext } from '../../contexts/UserContext';
import { CardContext } from '../../contexts/CardContext';
import { api } from '../../api/resources';

const Modify = () => {
  const [isSent, setIsSent] = useState(false);
  const { user } = useContext(UserContext);
  const { setCardContext } = useContext(CardContext);
  const location = useLocation();
  const card = location.state.data;
  useEffect(() => {

    if (isSent) {
      // object of relevant key/values:
      // skyfallID, userEmail, userID are used
      // to locate current user and card to be modified.
      // All other pairs are possible updating fields in
      // for cards in users document & users in cards document.
      const updates = {
        condition: card.condition,
        language: card.language,
        quantity: parseInt(card.quantity),
        price: parseFloat(card.price),
        comment: card.comment,
        isPublished: card.isPublished,
        datePublished: card.datePublished,
        userID: card.user_id,
        cardID: card._id,
      };
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('auth-token', user.token);
      const options = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(updates),
      };
      fetch(`${api.serverURL}/api/cards/modify`, options)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setCardContext(false);
          setIsSent(false);
        })
        .catch((error) => console.log('error', error));
    }
  }, [isSent]);

  return <CardListing card={card} setIsSent={setIsSent} />;
};

export default Modify;
