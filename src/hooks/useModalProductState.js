import { useReducer } from 'react';
import EditProduct from '../components/views/search/EditProduct';
import DeleteProduct from '../components/views/search/DeleteProduct';
import cardBack from '../assets/img/mtg_card_back.jpg'

const useModalProductState = (search, callback) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        ADD_TO_CART: 'add-to-cart',
        ADD_TO_WISHLIST: 'add-to-wishlist',
        BACK_TO_SEARCH: 'back-to-search',
        CONFIRM_DELETE: 'confirm-delete',
        DELETE_PRODUCT: 'delete-product',
        EXPAND_CARD: 'expand-card',
        GO_BACK: 'go-back',
        EDIT_PRODUCT: 'edit-product',
        CLOSE_MODAL: 'close',
    }

    const reducer = (state, action) => {
        console.log(action.payload.product)
        switch (action.type) {

            case ACTIONS.DELETE_PRODUCT:
                return {
                    open: true,
                    component: <DeleteProduct
                        attributes={{ ...action.payload.attributes, id: 'confirm-delete' }}
                        search={search}
                        product={action.payload.product}
                        handleClick={callback}
                    />
                };
            case ACTIONS.EDIT_PRODUCT:
                return {
                    open: true,
                    component:
                        <EditProduct
                            attributes={{ ...action.payload.attributes, id: 'confirm-edit' }}
                            search={search}
                            product={action.payload.product}
                            handleClick={callback}
                        />
                }
            // case ACTIONS.ADD_TO_CART:

            //     break;
            // case ACTIONS.ADD_TO_WISHLIST:

            //     break;
            case ACTIONS.REDUCE_CARD:
                return INIT;
            case ACTIONS.CONFIRM_DELETE:
                return INIT;
            case ACTIONS.GO_BACK:
                return INIT;
            case ACTIONS.BACK_TO_SEARCH:
                return INIT;
            default:
                return INIT;
        }
    }
    const [state, dispatch] = useReducer(reducer, INIT)

    const updateProductState = (id, product) => {
        console.log(id)
        console.log(product)
        dispatch({
            type: id,
            payload: {
                product: product,
                attributes: {
                    id: 'expand-card',
                    style: 'card-image',
                    src: product?.image_uris?.small || product?.card_faces[0]?.image_uris?.small,
                    alt: `${product?.name} image`,
                    placeholder: cardBack
                },
            }
        })
    }

    return [state, updateProductState];
}

export default useModalProductState;
