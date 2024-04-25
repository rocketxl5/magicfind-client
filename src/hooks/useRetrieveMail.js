import useFetchData from './useFetchData'
import useAuth from './contexthooks/useAuth';

const useRetrieveMail = () => {
    const { fetchData, loading, result } = useFetchData();
    const { auth } = useAuth();

    const mailRetriver = (type) => {


    }
    return { mailRetriver, loading, result }
}

export default useRetrieveMail
