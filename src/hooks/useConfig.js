import { useState } from 'react';

const useConfig = () => {
    const [config, setConfig] = useState(null);

    const getConfig = (search, token, type) => {
        if (search === 'catalog') {
            setConfig(
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
        }
        else if (search === 'collection') {

            setConfig(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                        'query': type
                    },
                }
            )
        }
    }
    return { config, getConfig }
}

export default useConfig;

