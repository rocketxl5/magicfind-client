import { useReducer } from 'react';
import Seller from '../components/views/search/product/Seller';
import Catalog from '../components/views/search/product/Catalog';
import Detail from '../components/views/search/product/Detail';

const ACTIONS = {
    COLLECTION: 'collection',
    CATALOG: 'catalog',
    API: 'api',
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

    const updateSearchResult = (search) => {

    }

    return [state, updateSearchResult];
}

export default useProduct
