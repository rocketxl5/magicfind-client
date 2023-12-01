import { useState, useEffect } from 'react';
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
    const [responseObject, setResponseObject] = useState(null);
    // const [updateResults, setUpdateResults] = useState(false);
    const [loading, setLoading] = useState(false)

    const deleteHandler = () => {
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
        fetch(`${api.serverURL}/api/cards`, options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLoading(false);
                setResponseObject(data);
                // navigate({
                //     pathname: '/search-collection',
                //     state: {
                //         message: 'Card successfully deleted',
                //     },
                // });
            })
            .catch((error) => {
                setLoading(false);
                setResponseObject(error)
                console.log('error', error)
            });

    }

    // useEffect(() => {
    //     if (updateResults) {
    //         navigate(`${location.pathname}`,
    //             {
    //                 state: { cards: responseObject.cards, type: location.state.type, search: `/${location.state.type}` },
    //             });
    //     }
    // }, [updateResults])

    return (
            <div className="card-delete-container">
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <>
                            {
                                !responseObject ? (
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
                                                <p>Are you sure you want to delete <strong>{card.name}</strong> from your collection?</p>
                                                <p>This will remove all the data associated with this card.</p>
                                                <p>Press <strong>Confirm</strong> to proceed with card removal.</p>
                                                <p>Press <strong>Go Back</strong> to leave without removing card.</p>
                                            </div>
                                            <div className="card-btns-wrapper">
                                                <div className="btn-container">
                                                    < button id="confirm-delete" className="card-btn bg-red color-light" type="button" onClick={handleClick}>
                                                        Confirm
                                                    </button>
                                                </div>
                                                <div className="btn-container">
                                                    < button id="go-back" className="card-btn bg-blue color-light" type="button" onClick={handleClick}>
                                                        Go Back
                                                    </button>
                                                </div>
                                            </div>
                                        </footer>
                                    </>
                                ) : (
                                        <div className="card-delete-container flex flex-column justify-between">
                                            {
                                                responseObject?.isDeleted ? (
                                                    <>
                                                        <header className="card-header">
                                                            <h2 className="color-green fw-500">{responseObject.message}</h2>
                                                        </header>
                                                        <section className="response-body">
                                                            <FaRegCheckCircle className="color-green" />
                                                        </section>
                                                        <footer className="card-footer">
                                                            <div className="btn-container">
                                                                <button id="unpublish-card" className="card-btn bg-green color-light" type="button" onClick={handleClick}>Back to Search Collection Page </button>
                                                            </div>
                                                        </footer>
                                                    </>
                                                ) : (
                                                    <>
                                                        <header className="card-header">
                                                            <h2 className="color-danger">{responseObject.message}</h2>
                                                        </header>
                                                        <section className="response-body">
                                                            <FaBan className="color-danger" />
                                                        </section>
                                                        <footer className="card-footer">
                                                            <div className="btn-container">
                                                                <button id="unpublish-card" className="card-btn bg-danger color-light" type="button" onClick={handleClick}>Back to Search Collection Page </button>
                                                            </div>
                                                        </footer>
                                                    </>
                                                )
                                            }

                                        </div>
                                )
                            }
                        </>
                    )
            }
        </div>
    )
}

export default DeleteCard;
