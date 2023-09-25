import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'


const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <section className="section col-12 home-page">
      <div className="section-title center">
        <h2>Welcome to Magic Find</h2>
      </div>
      <div className="section-content">
        <div className="article">
          <h2 className="article-title center">What it is</h2>
          <div className="article-body">
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
        <div className="article">
          <h2 className="article-title center">How it works</h2>
          <div className="article-body">
            <p>
              First of all, you need to <Link to={'/register'} >create your account</Link> and sign into it.
              At that point, you will be redirected to your own personnal virtual store.
            </p>
            <br />
            <p>
              This is where you can add the cards you wish to sell, any card from the 10 000 + Magic the Gathering catalog.
              All you have to do is enter the name of the card in the search field and Magic Find will
              retrieve all the existing versions of that card.
              The search field has an auto complete feature. If you only remember part of a name's card, Magic Find
              will suggest possible results that you can choose from.
              You can also update the information in your store.
            </p>
            <br />
            <p>
              As a member, you get the possibility to buy cards from other members of the community.
              Your Magic Find account also gives you access to an internal mail service with your own personal inbox.
              The Magic Find catalog is accessible anytime to anyone. But only members can buy, sell
              and communicate with other members. 
            </p>
          </div>
        </div>
        <div className="article">
          <h2 className="article-title center">Parts & Labour</h2>
          <div className="article-body">
            <p>
              Magic Find is a <strong>REST api</strong> with complete <strong>CRUD</strong> operations.
              This gives members the power to add, update or delete the content of their virtual store.
              The same is true for their mailbox.
              The Front End is built with <strong>React</strong>. It uses hooks and contexts to maintain
              and manage components state. All features are fully <strong>responsive</strong>.
              The Back End is built with <strong>Express.js</strong>. Requests are made to a no SQL <strong>mongoDB Atlas</strong> data base.
              Populating a store is made through a series of requests to the <a to="https://scryfall.com/docs/api" target="_blank" title="scryfall api docs"><strong>scryfall api</strong></a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
