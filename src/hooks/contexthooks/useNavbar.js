import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const useNav = () => {
    return useContext(NavContext);
}

export default useNav;