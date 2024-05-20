import useFetch from './useFetch'

const useModalForm = (type) => {
    const types = {
        'store-item': {},
        'deck-item': {}
    }



    const { fetch, loading, error, response } = useFetch();
}

export default useModalForm
