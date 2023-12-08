import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import Loading from '../../layout/Loading';
import { FaRegCheckCircle } from "react-icons/fa";
// import { FaBan } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const DeleteCard = (props) => {
    const { attributes, card, handleClick } = props;
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [response, setResponse] = useState({
        isDeleted: false,
        message: (() => {
            return (
                <>
                    <p>You are about to delete <strong>{card.name}</strong> from your collection.</p>
                    <p>This will remove all the information associated with this card.</p>
                </>
            )
        })()
    });

    const [loading, setLoading] = useState(false);
    const btnRef = useRef(null);

    // Triggers click event on button to close modal
    const closeModal = (button) => {
        setTimeout(() => {
            button.click();
        }, 1500)
    }

    const deleteHandler = (location) => {
        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);

        const input = {
            cardID: card._id,
            userID: auth.id,
        }
        const options = {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(input)
        }

        fetch(`${api.serverURL}/api/cards/`, options)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                const { cards, isDeleted, message } = data;
                const { cardName, type } = location.state;
                setResponse({ isDeleted: isDeleted, message: message })
                // If cardName is set
                if (cardName) {
                    // filter for cards with cardName
                    const updatedCards = cards.filter(card => card.name.toLowerCase() === cardName.toLowerCase());
                    const result = { cards: updatedCards, cardName: cardName, type: type, search: `/${type}` };

                    navigate(`${location.pathname}`,
                        {
                            state: result,
                        });
                    localStorage.setItem('search-result', JSON.stringify(result));
                    closeModal(btnRef.current)
                } else {
                    const result = { cards: cards, cardName: undefined, type: type, search: `/${type}` };

                    navigate(`${location.pathname}`,
                        {
                            state: result,
                        });
                    localStorage.setItem('search-result', JSON.stringify(result));
                    closeModal(btnRef.current)
                }

            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error)
            });
    }

    return (
        <div className="modal-container flex">
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <div className="modal-content flex-grow-1">
                            {
                                !response.isDeleted ? (
                                    <>
                                        <header className="card-header">
                                <h2 className="color-red fw-500">Delete Card Confirmation</h2>
                            </header>
                            <div className="card-body">
                                <section className="card-section">
                                    <CardImage attributes={attributes} />
                                </section>
                                <section className="card-section">
                                    <CollectionCardDetail card={card} />
                                </section>
                            </div>
                                        <div className="card-message">
                                                {response.message}
                                        </div>
                                        <footer className="card-footer">
                                <div className="card-btns-wrapper">
                                    <div className="btn-container">
                                                    < button
                                                        id="go-back"
                                                        className="btn bg-blue color-light"
                                                        type="button"
                                                        onClick={handleClick}
                                                    >
                                                        Go Back
                                        </button>
                                    </div>
                                    <div className="btn-container">
                                                    < button
                                                        id="confirm-delete"
                                                        className="btn bg-red color-light"
                                                        type="button"
                                                        onClick={handleClick}
                                                        onMouseDown={(e) => deleteHandler(location)} >
                                                        Confirm
                                        </button>
                                    </div>
                                </div>
                            </footer>
                                    </>
                                ) : (
                                    <div className="confirmation">
                                        <header className="card-header">
                                            <h2 className="color-green fw-500">{response.message}</h2>
                                        </header>
                                        <section className="response-body">
                                            <FaRegCheckCircle className="color-green" />
                                        </section>
                                        <footer className="card-footer">
                                            <div className="btn-container hide">
                                                    <button id="back-to-search" type="button" onClick={handleClick} ref={btnRef}></button>
                                            </div>
                                        </footer>
                                        </div>
                                )
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default DeleteCard;
