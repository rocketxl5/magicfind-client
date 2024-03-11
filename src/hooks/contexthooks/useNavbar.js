import { useContext } from 'react';
import { NavbarContext } from '../../contexts/NavbarContext';

const useSearch = () => {
    return useContext(NavbarContext);
}

export default useSearch;