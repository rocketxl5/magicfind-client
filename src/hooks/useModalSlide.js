import { useReducer } from 'react';
import SlideShow from '../components/views/modal/SlideShow';
import SingleShow from '../components/views/modal/SingleShow';

const useModalSlide = (callback, expandedImages) => {
    const ACTIONS = {
        OPEN: 'open',
        CLOSE: 'close',
    }

    const INIT = {
        open: false,
        component: null,
    }

    const reducer = (view, action) => {
        switch (action.type) {
            case ACTIONS.OPEN:
                return {
                    open: true,
                    component:
                        <SlideShow handleClick={callback} >
                            <>
                                {
                                    action.payload.images
                                }
                            </>
                        </SlideShow>
                }
            case ACTIONS.CLOSE:
                return INIT;
            default:
                return INIT;
        }
    }

    const [view, dispatch] = useReducer(reducer, INIT)

    const updateSliderView = (e, id) => {

        switch (e.target.name) {
            case 'modal-image':
                dispatch({
                    type: 'open',
                    payload: {
                        images: expandedImages[parseInt(id)],
                    }
                })
                break;
            case 'close-btn':
                dispatch({
                    type: 'close',
                })
                break;
            default:
                dispatch({
                    type: undefined
                })
        }
    }

    return [view, updateSliderView]
}

export default useModalSlide