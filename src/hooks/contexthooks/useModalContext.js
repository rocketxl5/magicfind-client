import { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';

const useModalContext = () => {
    return useContext(ModalContext);
}

export default useModalContext;