import { useState, useEffect, forwardRef } from 'react'
import Button from '../../layout/Button';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';
const INIT = {
    style: 'btn bg-blue color-light border-blue',
    type: 'button',
    value: 'Add To Collection',
    statue: false
}
const ApiCardFooter = forwardRef(function ApiCardFooter({ card, setLoading }, ref) {
    const [attributes, setAttributes] = useState(INIT);
    const [selectedCard, setSelectedCard] = useState(null);

    const { user } = useAuth();

    const attributesHandler = (message) => {
        let attr = { type: 'button', value: message.body, style: '' }
        switch (message.title) {
            case 'card_added':
                attr = { ...attr, style: 'btn bg-light color-success border-success disabled' };
                break;
            case 'card_exist':
                attr = { ...attr, style: 'btn bg-light color-primary border-primary disabled' };
                break;
            case 'not_found' || 'server':
                attr = { ...attr, style: 'btn bg-light color-danger border-danger disabled' };
                break;
            default:
                attr = { ...attr, style: 'btn bg-blue color-light border-blue', value: 'Add To Collection', status: true };
                break;
        }
        return attr;
    }

    useEffect(() => {

        if (selectedCard) {
            console.log(selectedCard)
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
                        return res.json();
                    }
                    return res.json().then((data) => {
                        setLoading(false);
                        setAttributes(attributesHandler(data));
                    });
                })
                .then((data) => {
                    console.log(data);
                    setAttributes(attributesHandler(data));
                    setLoading(false);
                    // navigate('/search-api');
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [selectedCard])

    const handleClick = () => {
        setSelectedCard(card)
    }
    return (

        <div className="card-btns-wrapper">
            <div className="btn-container">
                {/* <Button attributes={attributes} handleClick={handleClick} addCardRef={ref} /> */}
                <button id="add-to-collection" className={attributes.style} type={attributes.type} ref={ref} onClick={handleClick}>{attributes.value}</button>
                {/* <button className="btn bg-blue color-lg-grey" type="button" onClick={() => handleClick(card)}>{!isLoaded ? 'Add To Collection' : 'Added'}</button> */}
            </div>
        </div>

    )
})

export default ApiCardFooter
