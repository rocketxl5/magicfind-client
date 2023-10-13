import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext';
import { UserContext } from '../../../contexts/UserContext';
import Image from '../Image';
import { api } from '../../../api/resources';
import styled from 'styled-components';

const CatalogItem = ({ card }) => {
  const [quantity, setQuantity] = useState(1 || card.quantity_selected);
  const [isSelectedItem, setIsSelectedItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { cartItems, setCartItems, itemsCount, setItemsCount } =
    useContext(ShoppingCartContext);
  const location = useLocation();
  const handleClick = (e) => {
    if (e.currentTarget.id === 'add') {
      if (quantity < card.quantity) {
        setQuantity(parseInt(quantity) + 1);
      }
    } else if (e.currentTarget.id === 'remove' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const trashItem = (card) => {
    setIsSelectedItem(false);
    setQuantity(1);
    card.quantity_selected = 0;

    const items = [...cartItems];

    items.forEach((item, index) => {
      if (item._id === card._id) {
        items.splice(index, 1);
      }
    });
    setCartItems(items);
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  };

  // Add & Update items in cart
  const updateCart = (card) => {
    if (card.quantity_selected === quantity) {
      return console.log('no change in quantity');
    }
    const foundItem = cartItems.find((item) => {
      return item._id === card._id;
    });

    setLoading(true);

    const options = {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    };
    fetch(
      `${api.serverURL}/api/catalog/${card.name}/${card._id}/${card.quantity_selected}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (!data.data.isQuantityAvailable) {
          card.quantity = data.card.quantity;
          foundItem.quantity = data.card.quantity;
          card.quantity = data.card.quantity;
          const items = [...cartItems];
          setCartItems(items);
          // Send error message
        } else {
          if (!foundItem) {
            card.quantity_selected = quantity;
            setCartItems((cartItems) => [...cartItems, card]);
          } else {
            const selectedItem = cartItems.find((item) => {
              return item._id === card._id;
            });

            selectedItem.quantity_selected = quantity;

            const items = [...cartItems];
            setCartItems(items);
          }
        }
      });

    setIsSelectedItem(true);
  };

  const isSelected = (item) => {
    let selected = false;

    const itemFound = cartItems.find((cartItem) => {
      return cartItem._id === item._id;
    });

    if (itemFound) {
      card.quantity_selected = itemFound.quantity_selected;
      selected = true;
    }
    return selected;
  };

  useEffect(() => {
    const foundItem = cartItems.find((item) => {
      return item._id === card._id;
    });

    if (foundItem) {
      console.log('foundItem', foundItem);
      setIsSelectedItem(true);
      setQuantity(foundItem.quantity_selected);
    }
  }, [location]);

  return (
    <div className={loading ? 'item-container loading' : 'item-container'}>
      <>
        <div className="item-info">
          <div className="item-image">
            <Image card={card} />
          </div>

          <div className="item-details">
            <p>
              <strong>{card.set_name}</strong>
            </p>
            <p>
              Condition: <strong>{card.condition.toUpperCase()}</strong>
            </p>

            <p>
              Seller: <strong>{card.userName}</strong>
            </p>
            <p>
              Ships From: <strong>{card.userCountry}</strong>
            </p>
            <p>
              {' '}
              Price: <strong>${card.price}</strong>
            </p>
            <p>
              Available: <strong>{card.quantity}</strong>
            </p>
            {user && (
              <Contact
                to={{
                  pathname: '/mail/message',
                  state: { sender: card.userName, subject: card.name },
                }}
              >
                Contact Seller
              </Contact>
            )}
            <Selected
              className="item-cart"
              style={{
                border: card.quantity_selected ? '1px solid #e4e4e4' : '',
              }}
            >
              {isSelectedItem && isSelected(card) && (
                <>
                  <p>{card.quantity_selected} in Cart</p>

                  <FiTrash2
                    onClick={() => {
                      trashItem(card);
                    }}
                    size={20}
                    title="Remove Item"
                  />
                </>
              )}
            </Selected>
          </div>
        </div>

        <div className="item-buttons">
          <div className="item-quantity">
            <div
              className="add-remove-button"
              id="remove"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <FiMinusCircle size={23} />
            </div>
            <input type="text" id="quantity" name="quantity" value={quantity} />
            <div
              className="add-remove-button"
              id="add"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <FiPlusCircle size={23} />
            </div>
          </div>

          <button
            className="item-button success"
            onClick={() => updateCart(card)}
          >
            {isSelectedItem ? 'Update Cart' : 'Add To Cart'}
          </button>
        </div>
      </>
    </div>
  );
};

const SpinnerContainer = styled.div``;

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
  padding: 0.5em;
  margin-top: 0.5em;
  color: red;
  border: 1px solid #e4e4e4;
`;

export default CatalogItem;
