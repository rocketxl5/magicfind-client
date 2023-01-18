import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styled from 'styled-components';

const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <div>
      <h2 className="page-title">Welcome to Magic Find</h2>
      <div>
        <p>
          Magic Find is the only dedicated place where you can buy and sell
          Magic the Gathering cards without going through a third party. By
          registering to Magic Find you get access to a large community.
        </p>
        <br />
        <p>
          The goal of Magic Find is to give you the opportunity to sell your
          cards to other members of the Magic Find community wherever you are
          without having to settle for a third party purchase price list for
          your precious cards. In other words, you get to fix the price for the
          cards you sell. If you wish to buy cards from other members, you have
          the opportunity to do so too.
        </p>
        <br />
        <p>
          Magic Find's philosophy revolves around the belief that by cutting
          through intermediaries, you get to pay less for the cards you buy, and
          you get more bucks in your pocket for the ones you sell.
        </p>
      </div>
    </div>
  );
};

export default Home;
