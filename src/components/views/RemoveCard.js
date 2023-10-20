import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { UserContext } from '../../contexts/UserContext';
import { CardContext } from '../../contexts/CardContext';
import capitalizeString from '../utilities/capitalizeString';
import Image from './search/CardImage';
import { api } from '../../api/resources';
import styled from 'styled-components';

const Remove = () => {
  const { user } = useContext(UserContext);
  const { setCardContext } = useContext(CardContext);
  const history = useHistory();
  const location = useLocation();
  const card = location.state.data;
  const token = user.token;


  //   Remove card from use store
  const handleClick = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', token);
    const input = {
      cardID: card._id,
      userID: user.id,
    };
    const options = {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(input),
    };
    fetch(`${api.serverURL}/api/cards/`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCardContext(false);
        history.push({
          pathname: '/search-collection',
          state: {
            message: 'Card successfully deleted',
          },
        });
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <h2>Delete Product</h2>
      <header className="search-header">
        <GoBack to={'/search-collection'} title="Back To Collection">
          <BackIcon>
            <FiArrowLeftCircle size={26} />
          </BackIcon>
          <BackText>Back to Store</BackText>
        </GoBack>

        <span>
          {capitalizeString(card.name)}
        </span>
      </header>
      <div className="item-container">
        <div className="item-info">
          <div className="item-image">
            <Image className="item-image" card={card} />
          </div>

          <div className="item-details">
            <p>
              <strong>Name</strong>: {card.name}
            </p>
            <p>
              <strong>Asking Price</strong>: ${card.price}
            </p>
            <p>
              <strong>Foil</strong>: {card.foil ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Condition</strong>: {card.condition}
            </p>
            <p>
              <strong>Set</strong>: {card.set_name}
            </p>
            <p>
              <strong>Artist</strong>: {card.artist}
            </p>
            <p>
              <strong>Year</strong>: {card.frame}
            </p>
          </div>
        </div>
        <div className="item-buttons push-right">
          <button
            className="item-button danger full-width"
            onClick={handleClick}
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </>
  );
};

const Container = styled.div`
  height: 80vh;
`;
const Header = styled.header`
  display: flex;
  width: 100%;
  padding: 1.2% 0;
  margin: 1% 0;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: 0px 5px 5px -5px #e4e4e4;
`;
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1%;
  font-size: 1.1em;
  align-items: center;
`;
const GoBack = styled(Link)`
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;
const BackIcon = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BackText = styled.span`
  margin-left: 20px;
`;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: auto;
  padding: 2%;
`;

const CardImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-left: 5%;
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const Details = styled.div``;
const Buttons = styled.div`
  width: 100%;
  margin-top: 25px;
`;
const Button = styled.button`
  color: var(--extra-light-color);
  background: var(--danger-color);
  width: 100%;
  padding: 15px 0;

  font-size: 1rem;
  border: none;
`;
export default Remove;
