import { useContext } from 'react';
import { MenuContext } from '../../contexts/MenuContext';

const useMenu = () => {

    return useContext(MenuContext);
}

export default useMenu
