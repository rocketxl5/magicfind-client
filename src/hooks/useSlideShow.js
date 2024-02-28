import { useReducer } from 'react';
import SlideShow from '../features/modal/SlideShow';
// import SingleShow from '../components/views/modal/SingleShow';

const useSlideShow = (callback, expandedImages) => {
    const ACTIONS = {
        SLIDE_SHOW: 'slide-show',
        CLOSE: 'close',
    }

    const INIT = {
        open: false,
        component: null,
    }

    const reducer = (view, action) => {
        switch (action.type) {
            case ACTIONS.SLIDE_SHOW:
                return {
                    open: true,
                    component:
                        <SlideShow handleClick={callback} slides={action.payload.images} />
                }
            case ACTIONS.CLOSE:
                return INIT;
            default:
                return INIT;
        }
    }

    const [view, dispatch] = useReducer(reducer, INIT)

    const updateSlideShow = (name, id) => {
        switch (name) {
            case 'slide-show-btn':
                dispatch({
                    type: 'slide-show',
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

    return [view, updateSlideShow]
}

export default useSlideShow