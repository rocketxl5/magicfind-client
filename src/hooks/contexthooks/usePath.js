import { useContext } from 'react';
import { PathContext } from '../../contexts/PathContext';

const usePath = () => {
    return useContext(PathContext);
}

export default usePath;