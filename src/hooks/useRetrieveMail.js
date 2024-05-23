import useAxios from './useAxios'
import useAuth from './contexthooks/useAuth';

const useRetrieveMail = () => {
    const { fetch, loading, response } = useAxios();
    const { auth } = useAuth();

    const mailRetriver = (type) => {


    }
    return { mailRetriver, loading, response }
}

export default useRetrieveMail
