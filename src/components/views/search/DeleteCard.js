import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import Loading from '../../layout/Loading';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const DeleteCard = (props) => {
    const { attributes, card, handleClick } = props;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const btnRef = useRef(null);

    const closeModal = () => {
        btnRef?.current?.click();
    }

    const setCountDown = () => {
        setTimeout(closeModal, 2500);
    }

    useEffect(() => {
        if (response) {
            // If cardName is set
            navigate(`${location.pathname}`,
                {
                    state: { ...response },
                });
        }
        setCountDown()
    }, [response])

    const deleteCardHandler = (location) => {
        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', user.token);

        const input = {
            cardID: card._id,
            userID: user.id,
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
                let responseObject = { type: type, search: `/${type}`, message: message, isDeleted: isDeleted }

                // If cardName is set
                if (cardName) {
                    // filter for cards with cardName
                    const updatedCards = cards.filter(card => card.name.toLowerCase() === cardName.toLowerCase());
                    setResponse({ ...responseObject, cards: updatedCards, cardName: cardName });
                } else {
                    setResponse({ ...responseObject, cards: cards, cardName: undefined });
                }
            })
            .catch((error) => {
                setLoading(false);
                // setResponseObject(error)
                console.log('error', error)
            });
    }

    return (
        <div className="delete-card-content flex">
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <div className="flex-grow-1">
                            {
                                !response ? (
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
                            <footer className="card-footer">
                                <div className="card-delete-message">
                                    <p>You are about to delete <strong>{card.name}</strong> from your collection.</p>
                                    <p>This will remove all the information associated with this card.</p>
                                </div>
                                <div className="card-btns-wrapper">
                                    <div className="btn-container">
                                                    < button id="confirm-delete" className="btn bg-red color-light" type="button" onClick={handleClick} onMouseDown={(e) => deleteCardHandler(location)} >
                                            Confirm
                                        </button>
                                    </div>
                                    <div className="btn-container">
                                                    < button id="go-back" className="btn bg-blue color-light" type="button" onClick={handleClick}>
                                            Go Back
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
                                                <button id="back-to-search" className="card-btn bg-green color-light" type="button" onClick={handleClick} ref={btnRef}>Back to Search Collection Page </button>
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
