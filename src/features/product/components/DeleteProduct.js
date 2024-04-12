import { useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Image from '../../../components/Image';
import Success from './Success';
import Loader from '../../../layout/Loader';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useSearch from '../../../hooks/contexthooks/useSearch';
import { api } from '../../../api/resources';

const DeleteProduct = (props) => {
    // Props
    const { product, search, handleClick } = props;
    // States
    const [response, setResponse] = useState({
        isDeleted: false,
        message: (() => {
            return (
                <>
                    <p>You are about to delete <strong>{product.name}</strong> from your collection.</p>
                    <p>This will remove all the information associated with this card.</p>
                </>
            )
        })()
    });
    const [loading, setLoading] = useState(false);
    // Ref
    const btnRef = useRef(null);
    // Hooks
    const { auth } = useAuth();
    const { setUpdateCatalog, setUpdateCollection } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();

    // Triggers click event on button to close modal
    const closeModal = (result) => {
        setUpdateCollection(true);
        setTimeout(() => {
            localStorage.setItem('search-results', JSON.stringify(result));
            product._is_published && setUpdateCatalog(true);
            btnRef.current?.click();
            navigate(`${location.pathname}`,
                {
                    state: result,
                });
        }, 1500)
    }

    const deleteHandler = () => {
        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);

        const input = {
            itemID: product._uuid,
            productID: product._id,
            userID: auth.user.id,
        }
        const options = {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(input)
        }

        fetch(`${api.serverURL}/api/cards/delete`, options)
            .then(async (res) => {
                if (res.ok) {
                    return res.json()
                }
                const data = await res.json();
                setLoading(false);
                throw new Error(JSON.stringify(data));
            })
            .then((data) => {
                const { cards, isDeleted, message } = data;
                let result;
                setResponse({ isDeleted: isDeleted, message: message })
                // If cardName is set
                if (query !== 'all-cards') {
                    // filter for cards with cardName
                    const updatedCards = cards.filter(cardObj => cardObj.name.toLowerCase() === product.name.toLowerCase());
                    result = { cards: updatedCards, search, query: product.name };
                } else {
                    result = { cards: cards, search, query: product.name };
                }
                setLoading(false);
                localStorage.setItem('search-results', JSON.stringify(result));
                closeModal(result);
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error)
            });
    }

    return (
        <div className="modal-state">
            <div className={`modal-state-content`}>
                {loading && <Loader />}
                {response.isDeleted && <Success response={response} handleClick={handleClick} ref={btnRef} />}
                <>
                    <header className="modal-header bg-danger">
                        <div className="modal-title">
                            <h2 className="fw-500">Delete Card</h2>
                        </div>
                    </header>
                    <div className='scroll'>
                        <div className="modal-body">
                            <section className="modal-section">
                                <div className="card-section">

                                        <Image
                                            classList={'col-12'}
                                            product={product}
                                        />

                                </div>
                                <div className="card-section">
                                    {/* <CollectionDetails product={product} /> */}
                                </div>
                            </section>
                            <section className="modal-warning">
                                <div className="warning-message">
                                    {response.message}
                                </div>
                            </section>
                        </div>
                        <footer className="modal-footer">
                            <div className="flex space-between">
                                <button
                                    id="cancel"
                                    className="btn color-light bg-primary"
                                    type="button"
                                    onClick={handleClick}
                                >
                                    Cancel
                                </button>
                                < button
                                    id="confirm-delete"
                                    className="btn color-light bg-danger"
                                    type="button"
                                    onClick={handleClick}
                                    onMouseDown={deleteHandler}
                                >
                                    Confirm
                                </button>
                            </div>
                        </footer>
                    </div>
                </>
            </div>
        </div>
    )
}

export default DeleteProduct;
