import { useState } from 'react';
import useSearch from './contexthooks/useNavbar';

const useUrl = () => {
    const [url, setUrl] = useState('');
    const [config, setConfig] = useState(null);

    const { cardName, predictions, searchTerm, inputValue } = useSearch();


    const getUrl = (pathname) => {
        const parts = pathname.substring(1).split('/');
        if (parts.includes('catalog')) {
            const search = parts[0];
            const query = parts[1];
            setConfig(
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            setUrl(`/api/cards/${search}/${query}`);
        }
        else if (parts.includes('collection')) {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const search = parts[1];
            const query = parts[2];
            setConfig(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': auth.token
                    },
                }
            )
            setUrl(`/api/cards/${search}/${auth.user.id}/${query}`);
        }
    }
    return { url, config, getUrl }
}

export default useUrl;

