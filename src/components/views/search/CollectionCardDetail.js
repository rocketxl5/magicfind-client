import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../layout/Loading';
import capitalizeWord from '../../../utilities/capitalizeWord';
import { CardContext } from '../../../contexts/CardContext';
const CollectionCardDetail = ({ card }) => {
    const [loading, setLoading] = useState(false);
    const { setCardContext } = useContext(CardContext);
    const navigate = useNavigate();

    const publishHandler = () => {
    }
    const unpublishHandler = () => {
    }
    const deleteHandler = () => {
    }

    return (
        <>
            <div className="card-name">
                <p><span>{card.name}</span></p>
            </div>
            <div className="card-info">
                <div className="card-set">
                    <p>Set: <span>{card.set_name}</span></p>
                </div>
                <div className="card-release">
                    <p>Year:  <span>{card.released_at.split('-')[0]}</span></p>
                </div>
                <div className="card-rarity">
                    <p>Rarity:  <span>{capitalizeWord(card.rarity)}</span></p>
                </div>
                {
                    card.finishes[0] !== 'nonfoil' &&
                    <div className="card-finish">
                        <p>Finish:  <span className={card.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''}>{capitalizeWord(card.finishes[0])}</span></p>
                    </div>
                }
                <div className="card-frame">
                    <p>Frame:  <span>{card.frame}</span></p>
                </div>
                <div className="card-collector">
                    <p>Collector #:  <span>{card.collector_number}</span></p>
                </div>
                <div className="card-artist">
                    <p>Artist:  <span>{card.artist.split(',')[0]}</span></p>
                </div>
            </div>
            <div className="collection-btn">
                {!card.isPublishd ? (

                    <button id="publish-card" className="card-btn bg-blue" type="button" onClick={publishHandler}>Publish</button>
                ) : (
                    <button id="unpublish-card" className="card-btn bg-yellow" type="button" onClick={unpublishHandler}>Unpublish</button>
                )}
                < button id="remove-card" className="card-btn bg-red" type="button" onClick={deleteHandler}>
                    Delete
                </button>
            </div>
        </>
    )
}

export default CollectionCardDetail
