import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../layout/Loading';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';
import capitalizeWord from '../../../utilities/capitalizeWord';

const ApiCardDetail = ({ card }) => {
    const [loading, setLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(selectedCard)
        if (selectedCard) {

            setLoading(true)
            // console.log(user.token)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', user.token);

            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(selectedCard),
            };
            fetch(`${api.serverURL}/api/cards/add/${user.id}/${selectedCard.id}`, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    // setCardContext(false);
                    setLoading(false)
                    navigate('/search-api');
                })
                .catch((error) => {
                    console.log(error.message)
                    setLoading(false)
                });
        }
    }, [selectedCard])


    const handleClick = (card) => {
        setSelectedCard(card)
    }

    return (
        <>

            {
                loading ?
                    (
                        <Loading />
                    ) : (
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
                            <div className="card-btn-container">
                                <button id="cart-card" className="card-btn bg-blue color-lg-grey" type="button" onClick={() => handleClick(card)}>{!selectedCard ? 'Select' : 'Selected'}</button>
                            </div>

                        </>
                    )
            }


        </>
    )
}

export default ApiCardDetail
