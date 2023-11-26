import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const CollectionCardFooter = (props) => {
    const { card } = props;
    const [loading, setLoading] = useState(false);
    // const { setCardContext } = useContext(CardContext);
    const navigate = useNavigate();

    const publishHandler = () => {
    }
    const unpublishHandler = () => {
    }
    const deleteHandler = () => {
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
