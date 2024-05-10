import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const useSearch = () => {
    return useContext(NavContext);
}

export default useSearch;