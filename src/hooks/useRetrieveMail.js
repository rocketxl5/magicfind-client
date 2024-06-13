import useAxios from './useAxios'
import useAuthContext from './contexthooks/useAuthContext';

const useRetrieveMail = () => {
    const { fetch, loading, response } = useAxios();
    const { auth } = useAuthContext();

    const mailRetriver = (type) => {


    }
    return { mailRetriver, loading, response }
}

export default useRetrieveMail
