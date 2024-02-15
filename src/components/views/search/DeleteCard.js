import { useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Image from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import Success from './Success';
import Loading from '../../layout/Loading';
// import { FaBan } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const DeleteCard = (props) => {
    // Props
    const { card, search, handleClick } = props;
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
    const closeModal = (button, result, destination) => {
        setTimeout(() => {
            navigate(`${destination}`,
                {
                    state: result,
                });
            localStorage.setItem('search-results', JSON.stringify(result));
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
                const { cards, isDeleted, message } = data;
                let result;
                setResponse({ isDeleted: isDeleted, message: message })
                // If cardName is set
                if (query !== 'all-cards') {
                    // filter for cards with cardName
                    const updatedCards = cards.filter(cardObj => cardObj.name.toLowerCase() === card.name.toLowerCase());
                    result = { cards: updatedCards, search };
                } else {
                    result = { cards: cards, search };
                }
                setLoading(false);
                localStorage.setItem('search-results', JSON.stringify(result));
                closeModal(btnRef.current, result, location.pathname);
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error)
            });
    }

    return (
        <div className="modal-state">
            <div className={`modal-state-content ${loading ? 'border-light' : response.isDeleted ? 'border-success' : 'border-red'}`}>
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
                                                <section className="modal-section">
                                                    <div className="card-section">
                                                        <Image card={card} />
                                                    </div>
                                                    <div className="card-section">
                                                        <CollectionCardDetail card={card} />
                                                    </div>
                                                </section>
                                                <section className="modal-warning">
                                                    <div className="warning-message">
                                                {response.message}
                                                    </div>
                                                </section>
                                            </div>
                                            <footer className="modal-footer bg-red-light">
                                                <div className="btn-container">
                                                    <button id="go-back" className="btn bg-blue color-light" type="button" onClick={handleClick}>Cancel </button>
                                                    < button id="confirm-delete" className="btn bg-red color-light" type="button" onClick={handleClick} onMouseDown={(e) => deleteHandler(location)} >Confirm </button>

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
        </div>
    )
}

export default DeleteCard;
