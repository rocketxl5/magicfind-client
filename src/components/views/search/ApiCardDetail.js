import Loading from '../../layout/Loading';
import capitalizeWord from '../../../utilities/capitalizeWord';

const ApiCardDetail = ({ card, loading }) => {

    return (
        <>
            {
                loading ?
                    (
                        <Loading />
                    ) : (
                        <>
                            <div className="card-info">
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Set:</span> <span className="card-spec-value">{card.set_name}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Year:</span>  <span className="card-spec-value">{card.released_at.split('-')[0]}</span></p>
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
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Collector #:</span>  <span className="card-spec-value">{card.collector_number}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Artist:</span>  <span className="card-spec-value">{card.artist.split(',')[0]}</span></p>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default ApiCardDetail
