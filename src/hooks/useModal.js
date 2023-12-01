import { useState, useReducer } from 'react';
import ExpandedCardContent from '../components/views/search/ExpandedCardContent';
import DeleteCard from '../components/views/search/DeleteCard';
import Button from '../components/layout/Button';


const useModal = (card) => {
    // const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        EXPAND_CARD: 'expand-card',
        CLOSE_MODAL: 'close-modal',
        DELETE_CARD: 'delete-card',
        PUBLISH_CARD: 'publish-card',
        UNPUBLISH_CARD: 'unpublish-card',
        ADD_TO_CART: 'add-to-cart',
        ADD_TO_WISHLIST: 'add-to-wishlist',
        ADD_TO_COLLECTION: 'add-to-collection',
        CONFIRM_DELETE: 'confirm-delete',
        GO_BACK: 'go-back',
        BACK_TO_SEARCH: 'back-to-search'
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case ACTIONS.EXPAND_CARD:
                return {
                    open: true,
                    component:
                        <ExpandedCardContent handleClick={action.payload.eventHandler}>
                            {action.payload.ImageComponent}
                        </ExpandedCardContent>
                };
            case ACTIONS.CLOSE_MODAL:
                return { INIT }
            case ACTIONS.DELETE_CARD:
                return {
                    open: true,
                    component: <DeleteCard
                        attributes={{ ...action.payload.attributes, id: 'confirm-delete' }}
                        card={action.payload.card} handleClick={action.payload.eventHandler}
                    />
                };
            case ACTIONS.PUBLISH_CARD:

                break;
            case ACTIONS.UNPUBLISH_CARD:

                break;
            // case ACTIONS.ADD_TO_COLLECTION:

            //     break;
            // case ACTIONS.ADD_TO_CART:

            //     break;
            // case ACTIONS.ADD_TO_WISHLIST:

            //     break;
            // case ACTIONS.CONFIRM_DELETE:
            //     setIsOpen(true);
            //     break;
            // case ACTIONS.GO_BACK:
            //     setIsOpen(false);
            //     break;
            // case ACTIONS.BACK_TO_SEARCH:
            //     setIsOpen(false);
            //     break;

            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }
    const [state, dispatch] = useReducer(reducer, INIT)

    const updateState = (id, card, imgAttributes, ExpandedCard, eventHandler) => {
        dispatch({
            type: id,
            payload: {
                card: card,
                attributes: imgAttributes,
                ImageComponent: ExpandedCard,
                eventHandler: eventHandler,
            }
        })
    }


    return [state, { updateState }];
}

export default useModal;
