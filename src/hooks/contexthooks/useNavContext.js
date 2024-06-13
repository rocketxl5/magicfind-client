import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const useNavContext = () => {
    return useContext(NavContext);
}

export default useNavContext;