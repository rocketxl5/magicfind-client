import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';
// import { Link } from 'react-router-dom';
// import { FiChevronLeft } from 'react-icons/fi';

const APISearchResult = (props) => {
    const { cards, selectedCards } = props;
    const navigate = useNavigate();
    const { user } = useAuth();
    const [filteredCards, setFilteredCards] = useState(null)
    const [loading, setLoading] = useState(false);
    console.log(user)
    console.log(selectedCards)

    useEffect(() => {
        if (filteredCards) {
            console.log(filteredCards)
            setLoading(true)
            // console.log(user.token)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', user.token);

            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ cards: filteredCards, userID: user.id }),
            };
            fetch(`${api.serverURL}/api/cards/add`, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    // setCardContext(false);
                    setLoading(false)
                    navigate('/search-api');
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                });
        }

    }, [filteredCards])


    const handleClick = (e) => {
        const props = [
            // 'artist',
            // 'booster',
            // 'border_color',
            // 'collector_number',
            // 'colors',
            // 'finishes',
            // 'frame',
            '_id',
            // 'image_uris',
            // 'lang',
            // 'legalities',
            // 'mana_cost',
            'name',
            // 'oracle_text',
            // 'oversized',
            // 'prices',
            // 'promo',
            // 'rarity',
            // 'released_at',
            // 'set_name',
            // 'set_type',
            // 'type_line',
        ]

        const cardsReady = selectedCards.map(card => {
            let filteredProps = {}
            props.forEach(prop => {
                filteredProps = { ...filteredProps, [prop]: card[prop] }
            })
            return filteredProps
        })
        console.log(cardsReady)
        setFilteredCards(cardsReady)

    }
    return (
        <>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="api-result">

                        <div className="save-to-collection">
                            {/* <Link to='/search-api'>{<FiChevronLeft />} Back to {capitalizeString(type)}</Link> */}
                            {
                                <>
                                    <span className="selected-count"> {selectedCards.length > 0 ? ` Card Selected: ${selectedCards.length}` : 'Select a Card'}</span>
                                    {/* Conditionnaly rendering post button when cards are selected */}
                                    <button id="cart-card" className={`api-result-btn bg-yellow ${selectedCards.length === 0 && 'hide'}`} type="button" onClick={handleClick}>Save to Collection</button>
                                </>
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default APISearchResult;
