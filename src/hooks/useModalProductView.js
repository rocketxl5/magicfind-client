import { useReducer } from 'react';
import RotateBtn from '../features/modal/buttons/RotateBtn';
import TurnBtn from '../features/modal/buttons/TurnBtn';
import CloseBtn from '../features/modal/buttons/CloseBtn';
import SingleFaceCard from '../features/modal/SingleFaceCard';
import DoubleFaceCard from '../features/modal/DoubleFaceCard';

const useModalProductView = (callback) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        STATIC: 'static',
        FLIP: 'flip',
        ROTATE: 'rotate',
        TURN: 'turn'
    }

    const turnCard = () => {

        document.querySelector('.double-faced-card').classList.toggle('rotate-y');
    }

    const flipCard = () => {

        document.querySelector('.modal-image').classList.toggle('rotate-180');
    }

    const rotateCard = () => {

        document.querySelector('.modal-image').classList.toggle('rotate-90');
    }

    const SingleFacedCard = ({ children, action }) => {
        return (
            <div id={action} className="modal-view">
                <div className="modal-view-content">
                    {children[1]}
                    <div className="single-faced-card">
                        {children[0]}
                        {children[2]}
                    </div>
                </div>
            </div>
        )
    }

    const DoubleFacedCard = ({ children, action }) => {
        return (
            <div id={action} className="modal-view" >
                <div className="modal-view-content">
                    {children[1]}
                    {children[2]}
                    <div className="double-faced-card">
                        <div className="double-faced-recto">
                            {children[0][0]}
                        </div>
                        <div className="double-faced-verso">
                            {children[0][1]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const reducer = (view, action) => {
        switch (action.type) {
            case ACTIONS.STATIC:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            {/* Passing handleCardView as callback @ SearchResults */}
                            <CloseBtn style={`view-close-btn close-btn card-btn`} handleClick={callback} />
                        </SingleFacedCard>
                }
            case ACTIONS.ROTATE:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <CloseBtn style={`view-close-btn close-btn card-btn`} handleClick={callback} />
                            <RotateBtn handleClick={rotateCard} />
                        </SingleFacedCard>
                }
            case ACTIONS.FLIP:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <CloseBtn style={`view-close-btn close-btn card-btn`} handleClick={callback} />
                            <RotateBtn handleClick={flipCard} />
                        </SingleFacedCard>
                }
            case ACTIONS.TURN:
                return {
                    open: true,
                    component:
                        <DoubleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <CloseBtn style={`view-close-btn close-btn card-btn`} handleClick={callback} />
                            <TurnBtn handleClick={turnCard} />
                        </DoubleFacedCard>
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
                    type: 'flip',
                    payload: {
                        expandedImage: expandedImage,
                        layout: layout
                    }
                })
                break;
            case 'split':
            case 'planar':
                dispatch({
                    type: 'rotate',
                    payload: {
                        expandedImage: expandedImage,
                        layout: layout
                    }
                })
                break;
            case 'transform':
            case 'modal_dfc':
            case 'reversible_card':
            case 'double_faced_token':
            case 'art_series':
                dispatch({
                    type: 'turn',
                    payload: {
                        expandedImage: expandedImage,
                        layout: layout
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
                    type: 'static',
                    payload: {
                        expandedImage: expandedImage,
                        layout: layout
                    }
                })
                break;
            default:
                dispatch({
                    type: layout,
                })
                break;
        }
    }

    return [view, updateProductView]
}

export default useModalProductView
