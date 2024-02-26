import { api } from '../api/resources';

const cartLoader = async (userID, productID, quantity, setLoading) => {
    // loading state @ CartContext
    setLoading(true);

    const options = {
        method: 'GET',
        header: { 'Content-Type': 'application/json' },
    };

    return await fetch(
        `${api.serverURL}/api/catalog/${userID}/${productID}/${quantity}`,
        options
    )
        .then(res => res.json())

        .then((data) => {
            setLoading(false);
            return data;
        })
        .catch((error) => {
            setLoading(false)
            console.log(error.message)
        })
}

export default cartLoader;