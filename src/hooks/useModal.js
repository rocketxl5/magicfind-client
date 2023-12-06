import { useReducer } from 'react';
import ExpandedCardContent from '../components/views/search/ExpandedCardContent';
import DeleteCard from '../components/views/search/DeleteCard';
import FlipIcon from '../components/views/search/FlipIcon';

const useModal = (card) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        EXPAND_CARD: 'expand-card',
        REDUCE_CARD: 'reduce-card',
        FLIP_CARD: 'flip-card',
        DELETE_CARD: 'delete-card',
        CONFIRM_DELETE: 'confirm-delete',
        ADD_TO_COLLECTION: 'add-to-collection',
        ADD_TO_CART: 'add-to-cart',
        ADD_TO_WISHLIST: 'add-to-wishlist',
        GO_BACK: 'go-back',
        BACK_TO_SEARCH: 'back-to-search',
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case ACTIONS.EXPAND_CARD:
                return {
                    open: true,
                    component:
                        <ExpandedCardContent handleClick={action.payload.eventHandler}>
                            {action.payload.ImageComponent}
                            {action.payload.card.card_faces?.length ? <FlipIcon handleClick={action.payload.eventHandler} /> : null}
                        </ExpandedCardContent>
                };
            case ACTIONS.DELETE_CARD:
                return {
                    open: true,
                    component: <DeleteCard
                        attributes={{ ...action.payload.attributes, id: 'confirm-delete' }}
                        card={action.payload.card}
                        expandedImage={action.payload.ImageComponent}
                        handleClick={action.payload.eventHandler}
                    />
                };
            case ACTIONS.FLIP_CARD:
                return {
                    open: true,
                    component:
                        <ExpandedCardContent handleClick={action.payload.eventHandler}>
                            {action.payload.card.card_faces[1].normal}
                            {action.payload.card.card_faces.length ? <FlipIcon handleClick={action.payload.eventHandler} /> : null}
                        </ExpandedCardContent>
                };
            // case ACTIONS.ADD_TO_COLLECTION:

            //     break;
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

    const updateState = (id, card, attributes, ExpandedCard, eventHandler) => {
        dispatch({
            type: id,
            payload: {
                card: card,
                attributes: attributes,
                ImageComponent: ExpandedCard,
                eventHandler: eventHandler,
            }
        })
    }

    return [state, { updateState }];
}

export default useModal;
