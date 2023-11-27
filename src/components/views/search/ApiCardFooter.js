import { useState, useEffect } from 'react'
import Button from '../../layout/Button';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const ApiCardFooter = (props) => {
    const { card, setLoading } = props;
    const [attributes, setAttributes] = useState({
        style: 'card-btn bg-blue color-light border-blue',
        type: 'button',
        value: 'Add To Collection'
    });
    const [selectedCard, setSelectedCard] = useState(null);
    const { user } = useAuth();


    const attributesHandler = (message) => {
        let attr = { type: 'button', value: message.body, style: '' }
        switch (message.type) {
            case 'card_added':
                attr = { ...attr, style: 'card-btn bg-light color-success border-success' };
                break;
            case 'card_exist':
                attr = { ...attr, style: 'card-btn bg-light color-primary border-primary' };
                break;
            case 'not_found' || 'server':
                attr = { ...attr, style: 'card-btn bg-light color-danger border-danger' };
                break;
            default:
                attr = { ...attr, style: 'card-btn bg-blue color-light border-blue', value: 'Add To Collection' };
                break;
        }
        return attr;
    }

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
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    return res.json().then((data) => {
                        setLoading(false)
                        setAttributes(attributesHandler(data));
                        // throw new Error(data.message)
                    })
                })
                .then((data) => {
                    console.log(data)
                    setAttributes(attributesHandler(data))
                    setLoading(false)
                    // navigate('/search-api');
                })
                .catch((error) => {
                    // console.log(JSON.stringify(error))
                    // setMessage(error)
                    setLoading(false)
                });
        }
    }, [selectedCard])

    const handleClick = () => {
        setSelectedCard(card)
    }
    return (

        <div className="card-btns-wrapper">
            <div className="btn-container">
                <Button attributes={attributes} eventHandler={handleClick} />
                {/* <button className="card-btn bg-blue color-lg-grey" type="button" onClick={() => handleClick(card)}>{!isLoaded ? 'Add To Collection' : 'Added'}</button> */}
            </div>
        </div>

    )
}

export default ApiCardFooter
