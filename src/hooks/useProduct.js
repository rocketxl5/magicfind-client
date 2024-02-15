import { useState, useReducer } from 'react';
import Seller from '../components/views/search/product/Seller';
import CatalogHelpers from '../components/views/search/product/CatalogHandlers';
import Detail from '../components/views/search/product/Detail';
import ProductImage from '../components/views/search/ProductImage';
import Header from '../components/layout/Header';
import useLoadImage from './useLoadImage';
import useModalProductView from './useModalProductView';
import useModalProductState from './useModalProductState';

const ACTIONS = {
    COLLECTION: 'collection',
    CATALOG: 'catalog',
    API: 'api',
}
const useProduct = (cards, search) => {
    const [loading, setLoading] = useState(false);

    const card = {};

    const [imagesLoaded] = useLoadImage(cards);

    const [view, updateProductView] = useModalProductView(handleCardView);

    const [state, updateProductState] = useModalProductState(search, handleCardState);

    function handleCardView(e, layout, expandedImage) {
        e.stopPropagation();
        // console.log(e.target);
        updateProductView(layout, expandedImage)
    }

    function handleCardState(e, card, imgAttributes) {
        e.stopPropagation();
        updateProductState(e.target.id, card, imgAttributes)
    }

    // Product Component
    const ProductItem = ({ card }) => {
        return (
            <li className="product">
                <div className="product-container" >

                </div>
            </li>
        )
    }

    const reducer = (product, action) => {
        console.log(action.type)
        switch (action.type) {
            case ACTIONS.COLLECTION:
                return (
                    <ProductItem card={{}}>
                        <Header title={card.name} classList={'product-header'} />
                        <ProductImage loading={loading} />
                    </ProductItem>
                )
            case ACTIONS.CATALOG:
                return (
                    <ProductImage loading={loading} />
                )
            case ACTIONS.API:

                return (
                    <ProductImage loading={loading} />
                )
            default:
                break;
        }
    }

    const [product, dispatch] = useReducer(reducer);

    const updateProducts = (search) => {
    // imagesLoaded && 
    }

    return [product, updateProducts, view, state];
}

export default useProduct
