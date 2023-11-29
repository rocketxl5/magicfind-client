import { useState } from 'react'
import CardImage from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import ConfirmationMessage from './ConfirmationMessage';
import Loading from '../../layout/Loading';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const DeleteCard = (props) => {
    const { attributes, card, deleteCardOverlay, setDeleteCardOverlay } = props;
    const { user } = useAuth();
    const [responseObject, setResponseObject] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setDeleteCardOverlay(false);
    }

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
    return (
        <div className={`${deleteCardOverlay ? 'd-flex' : ''} overlay-container`}>
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
                                                    < button id="remove-card" className="card-btn bg-red color-light" type="button" onClick={deleteHandler}>
                                                        Confirm
                                                    </button>
                                                </div>
                                                <div className="btn-container">
                                                    < button id="remove-card" className="card-btn bg-blue color-light" type="button" onClick={handleClick}>
                                                        Go Back
                                                    </button>
                                                </div>
                                            </div>
                                        </footer>
                                    </>
                                ) : (
                                    <ConfirmationMessage {...responseObject} setDeleteCardOverlay={setDeleteCardOverlay} />
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
