import { useReducer } from 'react';
import Seller from '../components/views/search/product/Seller';
import Order from '../components/views/search/product/Order';
import Detail from '../components/views/search/product/Detail';

const ACTIONS = {
    COLLECTION: 'search-collection',
    CATALOG: 'search-catalog',
    API: 'search-api',
}
const useProduct = () => {

    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.COLLECTION:

                break;
            case ACTIONS.CATALOG:

                break;
            case ACTIONS.API:

                break;

            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer);

    const updateSearchResult = (searchType) => {

    }
}

export default useProduct