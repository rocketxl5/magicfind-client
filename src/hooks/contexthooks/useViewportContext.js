import { useContext } from 'react';
import { ViewportContext } from '../../contexts/ViewportContext';

const useViewportContext = () => {
    return useContext(ViewportContext);
}

export default useViewportContext;
