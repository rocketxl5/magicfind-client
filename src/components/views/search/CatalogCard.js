/***************************/
/**** Site Catalog Card ****/
/***************************/
import { Link } from 'react-router-dom';
// import { CardContext } from '../../../contexts/CardContext';
// import { PathContext } from '../../../contexts/PathContext';

import useAuth from '../../../hooks/useAuth';
import CardImage from './CardImage';
import styled from 'styled-components';

const CatalogCard = (props) => {
  const { index, card } = props;
  const { user } = useAuth();

  const image = {
    className: 'card-image',
    sizes: '80vw',
    src: card.image_uris && card.image_uris.png,
    srcSet: `${card.image_uris.small} 500w, ${card.image_uris.normal} 775w, ${card.image_uris.large} 1600w`
  }

  return (
    <div id={`card-${index}`} key={card.id} className="card-container">
      <div className="card-body">
        <div className="card-section">
          <div className="card-image">
            <CardImage image={image} />
          </div>
        </div>
        <div className="card-section">
          <div className="card-wrapper">
            <div className="card-name">
              <p><span>{card.name}</span></p>
            </div>
            <div className="card-info">
              <div className="card-seller">
                <p>Seller:  <span>{card.userName}</span></p>
              </div>
              <div className="card-condition">
                <p>Condition: <span>{card.condition.toUpperCase()}</span></p>
              </div>
              <div className="card-shipping">
                <p>Ships From:  <span>{card.userCountry}</span></p>
              </div>
              <div className="card-price">
                {/* <p>Price:  <span>{parseFloat(card.price)}</span></p> */}
                <p>Price:  <span>{card.price}</span></p>
              </div>
              {card.quantity > 0 &&
                <div className="card-quantity">
                  <p>Quantity:  <span>{card.quantity}</span></p>
                </div>
              }
              {user && (
                <div className="contact-user">
                  <Contact
                    to={{
                      pathname: '/mail/message',
                      state: { sender: card.userName, subject: card.name },
                    }}
                  >
                    Contact Seller
                  </Contact>
                </div>
              )}


            </div> 
          </div>
          <div className="card-btn-container">
            <button id="cart-card" className="card-btn bg-yellow color-dark" type="button" >Add to Cart</button>
          </div>

        </div>
      </div>
    </div>
  )
}

const Selected = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4vh;
    padding: 0 0.5em;
    margin-top: 0.5em;
    font-size: 0.9rem;

    svg {
      width: 1.5em;
      heigth: 1.5em;
      &:hover {
        cursor: pointer;
      }
    }
  `;

const Contact = styled(Link)`
    display: block;
    text-align: center;
    margin-inline-end: 1rem;
    padding-block: 0.5em;
    margin-top: 0.5em;
    font-size: var(--fs-125);
    color: var(--clr-blue);
    border: 1px solid #e4e4e4;
    border-radius: 5px;
  `;

export default CatalogCard;
