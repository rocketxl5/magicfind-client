import { useReducer } from 'react';
import ExpandedCardContent from '../components/views/search/ExpandedCardContent';
import EditCard from '../components/views/search/EditCard';
import DeleteCard from '../components/views/search/DeleteCard';
import FlipIcon from '../components/views/search/FlipIcon';

const useModal = (searchType, callback) => {
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
        REDUCE_CARD: 'reduce-card',
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case ACTIONS.EXPAND_CARD:
                // 
                return !action.payload.card.card_faces?.length ?
                    {
                    open: true,
                    component:
                        <ExpandedCardContent transform={false} handleClick={callback}>
                            {action.payload.ImageComponent}
                        </ExpandedCardContent>
                    } : {
                        open: true,
                        component:
                            <ExpandedCardContent transform={true} handleClick={callback}>
                                {action.payload.ImageComponent}
                                <FlipIcon handleClick={callback} />
                            </ExpandedCardContent>
                    }
            case ACTIONS.DELETE_CARD:
                return {
                    open: true,
                    component: <DeleteCard
                        attributes={{ ...action.payload.attributes, id: 'confirm-delete' }}
                        searchType={searchType}
                        card={action.payload.card}
                        handleClick={callback}
                    />
                };
            case ACTIONS.EDIT_CARD:
                return {
                    open: true,
                    component:
                        <EditCard
                            attributes={{ ...action.payload.attributes, id: 'confirm-edit' }}
                            searchType={searchType}
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

    const updateState = (id, card, attributes, ExpandedCard) => {
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
