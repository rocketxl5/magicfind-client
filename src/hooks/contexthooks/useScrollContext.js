import { useContext } from 'react';
import { ScrollContext } from '../../contexts/ScrollContext';

const useScrollContext = () => {
    return useContext(ScrollContext);
}

export default useScrollContext;