import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import Loading from '../../layout/Loading';
// import { FaRegCheckCircle } from "react-icons/fa";
// import { FaBan } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const DeleteCard = (props) => {
    const { attributes, card, handleClick } = props;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [responseObject, setResponseObject] = useState(null);
    const [loading, setLoading] = useState(false)

    const deleteCardHandler = (e) => {
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
                console.log(data);
                setLoading(false);
                setResponseObject({ ...data, event: e });  
            })
            .catch((error) => {
                setLoading(false);
                setResponseObject(error)
                console.log('error', error)
            });
    }

    useEffect(() => {
        if (responseObject) {
            const { cards, isDeleted, message, event } = responseObject;

            console.log(responseObject)
            handleClick(event)
            if (isDeleted) {
                navigate(`${location.pathname}`,
                    {
                        state: { cards: cards, message: message, type: location.state.type, search: `/${location.state.type}` },
                    });
            }
            else {
                console.log(responseObject.message)
            }
        }
    }, [responseObject])

    return (
        <div className="delete-card-content flex">
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <div className="flex-grow-1">
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
                                        < button id="confirm-delete" className="btn bg-red color-light" type="button" onClick={(e) => deleteCardHandler(e)}>
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
                        </div>
                    )
            }
        </div>
    )
}

export default DeleteCard;
