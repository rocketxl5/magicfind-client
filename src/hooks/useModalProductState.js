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
        DELETE_CARD: 'delete-card',
        EXPAND_CARD: 'expand-card',
        GO_BACK: 'go-back',
        EDIT_CARD: 'edit-card',
        CLOSE_MODAL: 'close',
    }

    const reducer = (state, action) => {

        switch (action.type) {

            case ACTIONS.DELETE_CARD:
                return {
                    open: true,
                    component: <DeleteProduct
                        attributes={{ ...action.payload.attributes, id: 'confirm-delete' }}
                        search={search}
                        card={action.payload.card}
                        handleClick={callback}
                    />
                };
            case ACTIONS.EDIT_CARD:
                return {
                    open: true,
                    component:
                        <EditProduct
                            attributes={{ ...action.payload.attributes, id: 'confirm-edit' }}
                            search={search}
                            card={action.payload.card}
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

    const updateProductState = (id, card) => {
        dispatch({
            type: id,
            payload: {
                card: card,
                attributes: {
                    id: 'expand-card',
                    style: 'card-image',
                    src: card?.image_uris?.small || card?.card_faces[0]?.image_uris?.small,
                    alt: `${card?.name} image`,
                    placeholder: cardBack
                },
            }
        })
    }

    return [state, updateProductState];
}

export default useModalProductState;
