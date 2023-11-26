import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const ApiCardFooter = (props) => {
    const { card, setLoading } = props;
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null);
    const { user } = useAuth();

    useEffect(() => {

        if (selectedCard) {

            setLoading(true)
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
                    console.log(data)
                    // setCardContext(false);
                    setIsLoaded(true)
                    setLoading(false)
                    // navigate('/search-api');
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

        <div className="card-btns-wrapper">
            <div className="btn-container">
                <button className="card-btn bg-blue color-lg-grey" type="button" onClick={() => handleClick(card)}>{!isLoaded ? 'Add To Collection' : 'Added'}</button>
            </div>
        </div>

    )
}

export default ApiCardFooter
