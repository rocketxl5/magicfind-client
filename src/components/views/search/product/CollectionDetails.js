import useColorSymbols from '../../../../hooks/useColorSymbols';
import capitalizeWord from '../../../../assets/utilities/capitalizeWord';
import getYear from '../../../../assets/utilities/getYear';
import data from '../../../../assets/data/SEARCH';

const CollectionDetails = ({ card }) => {

    return (
        <div className="card-info">
            <div className="card-spec">
                <p><span className="card-spec-title">Name:</span> <span className="card-spec-value">{card.name}</span></p>
            </div>
            <div className="card-spec">
                <p><span className="card-spec-title">Set:</span> <span className="card-spec-value">{card.set_name}</span></p>
            </div>
            <div className="card-spec">
                <p><span className="card-spec-title">Year: </span> <span className="card-spec-value">{card.released_at?.split('-')[0]}</span></p>
            </div>
            <div className="card-spec">
                <p><span className="card-spec-title">Rarity:</span>  <span className="card-spec-value">{capitalizeWord(card.rarity)}</span></p>
            </div>
            {
                card.finishes[0] !== 'nonfoil' &&
                <div className="card-spec">
                    <p><span className="card-spec-title">Finish:</span>  <span className={`${card.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''} card-spec-value`}>{capitalizeWord(card.finishes[0])}</span></p>
                </div>
            }
            <div className="card-spec">
                <p><span className="card-spec-title">Frame:</span>  <span className="card-spec-value">{card.frame}</span></p>
            </div>
            <div className="card-collspecector">
                <p><span className="card-spec-title">Collector #:</span>  <span className="card-spec-value">{card.collector_number}</span></p>
            </div>
            <div className="card-spec">
                <p><span className="card-spec-title">Artist:</span>  <span className="card-spec-value">{card.artist.split(',')[0]}</span></p>
            </div>
            <div className="card-status">
                <p><span className="card-spec-title">Status:</span>  <span className="card-spec-value">{card._is_published ? 'Published' : 'Unpublished'}</span></p>
            </div>
        </div>
    )
}

export default CollectionDetails