import { useReducer } from 'react';
import ExpandedCardContent from '../components/views/search/ExpandedCardContent';
import PublishCard from '../components/views/search/PublishCard';
import DeleteCard from '../components/views/search/DeleteCard';
import FlipIcon from '../components/views/search/FlipIcon';

const useModal = (callback) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        ADD_TO_CART: 'add-to-cart',
        ADD_TO_COLLECTION: 'add-to-collection',
        ADD_TO_WISHLIST: 'add-to-wishlist',
        BACK_TO_SEARCH: 'back-to-search',
        CONFIRM_DELETE: 'confirm-delete',
        DELETE_CARD: 'delete-card',
        EXPAND_CARD: 'expand-card',
        FLIP_CARD: 'flip-card',
        GO_BACK: 'go-back',
        PUBLISH_CARD: 'publish-card',
        REDUCE_CARD: 'reduce-card',
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case ACTIONS.EXPAND_CARD:
                return {
                    open: true,
                    component:
                        <ExpandedCardContent handleClick={callback}>
                            {action.payload.ImageComponent}
                            {action.payload.card.card_faces?.length ? <FlipIcon handleClick={callback} /> : null}
                        </ExpandedCardContent>
                };
            case ACTIONS.DELETE_CARD:
                return {
                    open: true,
                    component: <DeleteCard
                        attributes={{ ...action.payload.attributes, id: 'confirm-delete' }}
                        card={action.payload.card}
                        // expandedImage={action.payload.ImageComponent}
                        handleClick={callback}
                    />
                };
            case ACTIONS.FLIP_CARD:
                return {
                    open: true,
                    component:
                        <ExpandedCardContent handleClick={callback}>
                            {action.payload.card.card_faces[1].normal}
                            {action.payload.card.card_faces.length ? <FlipIcon handleClick={callback} /> : null}
                        </ExpandedCardContent>
                };
            case ACTIONS.PUBLISH_CARD:
                return {
                    open: true,
                    component:
                        <PublishCard
                            attributes={{ ...action.payload.attributes, id: 'confirm-publish' }}
                            card={action.payload.card}
                            // expandedImage={action.payload.ImageComponent}
                            handleClick={callback}
                        />
                }

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
            }
        })
    }

    return [state, { updateState }];
}

export default useModal;
