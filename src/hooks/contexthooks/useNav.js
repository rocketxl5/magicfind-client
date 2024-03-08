import { useContext } from 'react';
import { NavigationContext } from '../../contexts/NavigationContext';

const useNav = () => {

    return useContext(NavigationContext);
}

export default useNav;
