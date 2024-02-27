import { useContext } from 'react';
import { ScrollContext } from '../contexts/ScrollContext';

const useScroll = () => {
    return useContext(ScrollContext);
}

export default useScroll;