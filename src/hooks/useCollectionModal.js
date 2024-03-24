import { useReducer } from 'react';
import EditProduct from '../features/product/EditProduct';
import DeleteProduct from '../features/product/DeleteProduct';
import cardBack from '../assets/img/mtg_card_back.jpg';

// Edit and Delete product form
const useCollectionModal = (search, callback) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        CONFIRM_DELETE: 'confirm-delete',
        DELETE_PRODUCT: 'delete-product',
        CANCEL: 'cancel',
        EDIT_PRODUCT: 'edit-product',
        CLOSE_MODAL: 'close',
    }

    const reducer = (state, action) => {

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
            case ACTIONS.CONFIRM_DELETE:
                return INIT;
            case ACTIONS.CANCEL:
                return INIT;
            default:
                return INIT;
        }
    }
    const [state, dispatch] = useReducer(reducer, INIT)

    const useCollectionItem = (id, product) => {
        console.log(id)
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

    return [state, useCollectionItem];
}

export default useCollectionModal;
