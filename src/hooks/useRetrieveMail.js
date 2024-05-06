import useFetch from './useFetch'
import useAuth from './contexthooks/useAuth';

const useRetrieveMail = () => {
    const { fetchOne, loading, response } = useFetch();
    const { auth } = useAuth();

    const mailRetriver = (type) => {


    }
    return { mailRetriver, loading, response }
}

export default useRetrieveMail
