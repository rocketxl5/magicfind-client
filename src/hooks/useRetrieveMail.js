import useFetch from './useFetch'
import useAuth from './contexthooks/useAuth';

const useRetrieveMail = () => {
    const { fetch, loading, response } = useFetch();
    const { auth } = useAuth();

    const mailRetriver = (type) => {


    }
    return { mailRetriver, loading, response }
}

export default useRetrieveMail
