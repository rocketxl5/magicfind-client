import useFetch from './useFetch'
import useAuth from './contexthooks/useAuth';

const useRetrieveMail = () => {
    const { fetch, loading, result } = useFetch();
    const { auth } = useAuth();

    const mailRetriver = (type) => {


    }
    return { mailRetriver, loading, result }
}

export default useRetrieveMail
