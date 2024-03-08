import { useContext } from 'react';
import { ViewportContext } from '../../contexts/ViewportContext';

const useViewport = () => {
    return useContext(ViewportContext);
}

export default useViewport;
