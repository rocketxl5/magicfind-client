import { useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ProductImage from './components/ProductImage';
import CollectionDetails from './components/CollectionDetails';
import Success from './Success';
import Loading from '../../layout/Loading';
// import { FaBan } from "react-icons/fa6";
import useAuth from '../../hooks/contexthooks/useAuth';
import useSearch from '../../hooks/contexthooks/useSearch';
import { api } from '../../api/resources';
import { FaChessKing } from 'react-icons/fa6';

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
    const { setUpdateCatalog } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();


    // Triggers click event on button to close modal
    const closeModal = (result) => {
        setTimeout(() => {
            navigate(`${location.pathname}`,
                {
                    state: result,
                });
            localStorage.setItem('search-results', JSON.stringify(result));
            setUpdateCatalog(true);
            btnRef.current?.click();
        }, 1500)
    }

    const deleteHandler = () => {
        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);

        const input = {
            cardID: product._id,
            userID: auth.user.id,
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
                    const updatedCards = cards.filter(cardObj => cardObj.name.toLowerCase() === product.name.toLowerCase());
                    result = { cards: updatedCards, search };
                } else {
                    result = { cards: cards, search };
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
            <div className={`modal-state-content ${loading ? 'border-light' : response.isDeleted ? 'border-success' : 'border-danger'}`}>
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
                                                        <ProductImage product={product} />
                                                </div>
                                                <div className="card-section">
                                                    <CollectionDetails product={product} />
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
                                                    <button id="cancel" className="btn bg-primary color-light" type="button" onClick={handleClick}>Cancel </button>
                                                    < button id="confirm-delete" className="btn bg-red color-light" type="button" onClick={handleClick} onMouseDown={deleteHandler} >Confirm </button>

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

export default DeleteProduct;
