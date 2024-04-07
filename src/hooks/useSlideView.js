import { useReducer } from 'react';
import OneSidedSlide from '../features/modal/OneSidedSlide';
import TwoSidedSlide from '../features/modal/TwoSidedSlide';
import SlideView from '../features/modal/SlideView';

const useSlideView = (callback) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        SINGLE: 'single',
        DOUBLE: 'double'
    }

    const reducer = (view, action) => {
        switch (action.type) {
            case ACTIONS.SINGLE:
                return {
                    open: true,
                    component:
                        <SlideView handleClick={callback}>
                            <OneSidedSlide classList={{ container: 'modal-slide-container' }}>
                                {action.payload.expandedImage}
                            </OneSidedSlide>
                        </SlideView>
                }
            case ACTIONS.DOUBLE:
                return {
                    open: true,
                    component:
                        <SlideView handleClick={callback}>
                            <TwoSidedSlide classList={{ container: 'modal-slide-container', btn: 'action-btn' }}>
                                {action.payload.expandedImage}
                            </TwoSidedSlide>
                        </SlideView>
                }
            default:
                return INIT;
        }
    }

    const [view, dispatch] = useReducer(reducer, INIT)

    const updateProductView = (layout, expandedImage) => {
        switch (layout) {
            case 'flip':
                dispatch({
                    type: 'single',
                    payload: {
                        expandedImage: expandedImage,
                    }
                })
                break;
            case 'split':
            case 'planar':
                dispatch({
                    type: 'single',
                    payload: {
                        expandedImage: expandedImage,
                    }
                })
                break;
            case 'transform':
            case 'modal_dfc':
            case 'reversible_card':
            case 'double_faced_token':
            case 'art_series':
                dispatch({
                    type: 'double',
                    payload: {
                        expandedImage: expandedImage,
                    }
                })
                break;
            case 'normal':
            case 'leveler':
            case 'class':
            case 'saga':
            case 'meld':
            case 'adventure':
            case 'mutate':
            case 'prototype':
            case 'scheme':
            case 'token':
            case 'emblem':
            case 'augment':
            case 'host':
            case 'vanguard':
                dispatch({
                    type: 'single',
                    payload: {
                        expandedImage: expandedImage,
                    }
                })
                break;
            default:
                dispatch({
                    type: null,
                })
                break;
        }
    }

    return [view, updateProductView]
}

export default useSlideView
