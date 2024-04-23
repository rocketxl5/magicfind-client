import { useContext } from 'react';
import { MailContext } from '../../contexts/MailContext';

const useInbox = () => {
    return useContext(MailContext);
}

export default useInbox;