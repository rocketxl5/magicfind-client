import { useState, useEffect } from 'react'
// import Button from '../../layout/Button';
import useAuth from '../../../../hooks/useAuth';
import { api } from '../../../../api/resources';
const INIT = {
    style: 'btn bg-blue color-light border-blue',
    type: 'button',
    value: 'Add To Collection',
    statue: false
}
const API = ({ card, setLoading }) => {
    const [attributes, setAttributes] = useState(INIT);
    const [selectedCard, setSelectedCard] = useState(null);

    const { auth } = useAuth();

    const attributesHandler = (message) => {
        let attr = { type: 'button', value: message.body, style: '' }
        switch (message.title) {
            case 'card_added':
                attr = { ...attr, style: 'btn btn-api bg-light color-success border-success disabled' };
                break;
            case 'card_exist':
                attr = { ...attr, style: 'btn btn-api bg-light color-primary border-primary disabled' };
                break;
            case 'not_found' || 'server':
                attr = { ...attr, style: 'btn btn-api bg-light color-danger border-danger disabled' };
                break;
            default:
                attr = { ...attr, style: 'btn btn-api bg-blue color-light border-primary', value: 'Add To Collection', status: true };
                break;
        }
        return attr;
    }

    useEffect(() => {
        setAttributes(attributesHandler(''))
    }, [])

    useEffect(() => {

        if (selectedCard) {

            setLoading(true)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);

            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(selectedCard),
            };
            fetch(`${api.serverURL}/api/cards/add/${auth.id}/${selectedCard.id}`, options)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return res.json().then((data) => {
                        setLoading(false);
                        throw new Error(JSON.stringify(data))
                    });
                })
                .then((data) => {
                    setAttributes(attributesHandler(data.message));
                    setLoading(false);
                })
                .catch((error) => {
                    const errorMessage = JSON.parse(error.message)
                    setAttributes(attributesHandler(errorMessage));
                    // console.log(error);
                    setLoading(false);
                });
        }
    }, [selectedCard])

    const handleClick = () => {
        setSelectedCard(card)
    }
    return (


            <div className="btn-container">
                {/* <Button attributes={attributes} handleClick={handleClick}  /> */}
                <button id="add-to-collection" className={attributes.style} type={attributes.type} onClick={handleClick}>{attributes.value}</button>
                {/* <button className="btn bg-blue color-lg-grey" type="button" onClick={() => handleClick(card)}>{!isLoaded ? 'Add To Collection' : 'Added'}</button> */}
            </div>


    )
}

export default API
