import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/resources';

const CollectionCardFooter = (props) => {
    const { card } = props;
    const [loading, setLoading] = useState(false);
    // const { setCardContext } = useContext(CardContext);
    const navigate = useNavigate();
    const auth = useAuth();

    const publishHandler = () => {
    }
    const unpublishHandler = () => {
    }
    const deleteHandler = () => {
        setLoading(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.user.token);

        const input = {
            cardID: card._id,
            userID: auth.user.id,
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
                navigate({
                    pathname: '/search-collection',
                    state: {
                        message: 'Card successfully deleted',
                    },
                });
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error)
            });
    }
    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                < button id="remove-card" className="card-btn bg-red color-light" type="button" onClick={deleteHandler}>
                    Delete
                </button>
            </div>
            {!card.isPublished ? (
                <div className="btn-container">
                    <button id="publish-card" className="card-btn bg-blue color-light" type="button" onClick={publishHandler}>Publish</button>
                </div>
            ) : (
                <div className="btn-container">
                    <button id="unpublish-card" className="card-btn bg-yellow color-light" type="button" onClick={unpublishHandler}>Unpublish</button>
                </div>
            )}
        </div>
    )
}

export default CollectionCardFooter
