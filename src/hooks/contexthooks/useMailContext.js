import { useContext } from 'react';
import { MailContext } from '../../contexts/MailContext';

const useMailContext = () => {
    return useContext(MailContext);
}

export default useMailContext;