import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth';
import useSearch from '../../../hooks/useSearch';
import { api } from '../../../api/resources';

const INIT = {
    style: 'btn bg-primary color-light border-blue',
    type: 'button',
    value: 'Add To Collection',
    statue: false
}
const ArchiveHandlers = ({ product, setLoading }) => {
    const [attributes, setAttributes] = useState(INIT);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { auth } = useAuth();
    const { setUpdateCollection } = useSearch();

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
                attr = { ...attr, style: 'btn btn-api bg-primary color-light border-primary', value: 'Add To Collection', status: true };
                break;
        }
        return attr;
    }

    useEffect(() => {
        setAttributes(attributesHandler(''))
    }, [])

    useEffect(() => {
        // console.log(selectedProduct)
        if (selectedProduct) {

            setLoading(true)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);

            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(selectedProduct),
            };
            fetch(`${api.serverURL}/api/cards/add/${auth.user.id}/${selectedProduct.id}`, options)
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
                    setUpdateCollection(true)
                    setLoading(false);
                })
                .catch((error) => {
                    const errorMessage = JSON.parse(error.message)
                    setAttributes(attributesHandler(errorMessage));
                    // console.log(error);
                    setLoading(false);
                });
        }
    }, [selectedProduct])

    const handleClick = (e) => {
        setSelectedProduct(product)
    }
    return (
        <div className="archive-handlers">
            <div className="btn-container">

                <button id="add-to-collection" className={attributes.style} type={attributes.type} onClick={handleClick}>{attributes.value}</button>
                {/* <button className="btn bg-primary color-lg-grey" type="button" onClick={() => handleClick(card)}>{!isLoaded ? 'Add To Collection' : 'Added'}</button> */}
            </div>
        </div>
    )
}

export default ArchiveHandlers
