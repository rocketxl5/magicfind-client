import { useNavigate } from 'react-router-dom';
import setQueryString
    from '../../../utilities/setQueryString';
const CollectionCardFooter = ({ card, handleClick }) => {
// const navigate = useNavigate();

    // const handleClick = (e) => {
    //     navigate(`/publish-card/${setQueryString(card.name, '-')}`, {
    //         state: {
    //             card: card
    //         }
    //     })
    // }
    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                < button id="delete-card" className="btn bg-red color-light" type="button">
                    Delete
                </button>
            </div>
            {!card.isPublished ? (
                <div className="btn-container">
                    <button id="publish-card" className="btn bg-blue color-light" type="button">Publish</button>
                </div>
            ) : (
                <div className="btn-container">
                        <button id="unpublish-card" className="btn bg-yellow color-light" type="button" >Update</button>
                </div>
            )}
        </div>
    )
}

export default CollectionCardFooter
