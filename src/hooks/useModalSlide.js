import { useReducer } from 'react';
import SlideView from '../features/modal/SlideView';
import SlideShow from '../features/modal/SlideShow';
// import SingleShow from '../components/views/modal/SingleShow';

const useModalSlide = (callback, expandedImages) => {
    const ACTIONS = {
        SLIDE_SHOW: 'slide-show',
        SLIDE_VIEW: 'slide-view',
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
                        <SlideShow handleClick={callback} >
                            <>
                                {
                                    action.payload.images
                                }
                            </>
                        </SlideShow>
                }
            case ACTIONS.SLIDE_VIEW:
                return {
                    open: true,
                    component:
                        <SlideView handleClick={callback} >
                            <>
                                {
                                    action.payload.images
                                }
                            </>
                        </SlideView>
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
            case 'slide-show-btn':
                console.log(e.target)
                dispatch({
                    type: 'slide-show',
                    payload: {
                        images: expandedImages[parseInt(id)],
                    }
                })
                break;
            case 'slide-view-btn':
                console.log(e.target)
                dispatch({
                    type: 'slide-view',
                    payload: {
                        Image: expandedImages[parseInt(id)],
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