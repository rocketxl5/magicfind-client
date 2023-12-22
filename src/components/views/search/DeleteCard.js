import { useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import CardImage from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import Success from './Success';
import Loading from '../../layout/Loading';
// import { FaBan } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const DeleteCard = (props) => {
    // Props
    const { card, searchType, attributes, handleClick } = props;
    // States
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
    // Ref
    const btnRef = useRef(null);
    // Routing
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();
    // Hook
    const { auth } = useAuth();

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

        fetch(`${api.serverURL}/api/cards/delete`, options)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return res.json().then((data) => {
                    setLoading(false)
                    throw new Error(JSON.stringify(data))
                })
            })
            .then((data) => {
                setLoading(false);
                const { cards, isDeleted, message } = data;
                setResponse({ isDeleted: isDeleted, message: message })
                // If cardName is set
                if (query !== 'all-cards') {
                    console.log(searchType)
                    // filter for cards with cardName
                    const updatedCards = cards.filter(cardObj => cardObj.name.toLowerCase() === card.name.toLowerCase());
                    const result = { cards: updatedCards, searchType };
                    navigate(`${location.pathname}`,
                        {
                            state: result,
                        });
                    localStorage.setItem('search-result', JSON.stringify(result));
                    closeModal(btnRef.current)
                } else {
                    const result = { cards: cards, searchType };
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
        <div className={`modal-content ${loading ? 'border-light' : response.isDeleted ? 'border-success' : 'border-red'}`}>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <>
                            {
                                !response.isDeleted ? (
                                    <>

                                        <header className="modal-header bg-red">
                                            <div className="modal-title">
                                                <h2 className="fw-500">Delete Card</h2>
                                            </div>
                            </header>
                                        <div className="modal-body">
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
                                        </div>
                                        <footer className="modal-footer bg-red-light">
                                <div className="card-btns-wrapper">
                                                <div className="btn-container">
                                                    < button
                                                        id="go-back"
                                                        className="btn bg-yellow-2 color-light"
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
                                        <Success response={response} handleClick={handleClick} ref={btnRef} />
                                )
                            }
                        </>
                    )
            }
        </div>
    )
}

export default DeleteCard;
