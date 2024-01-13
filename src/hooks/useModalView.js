import { useReducer } from 'react'
import RotateBtn from '../components/views/search/cardbtn/RotateBtn'
import TurnBtn from '../components/views/search/cardbtn/TurnBtn'
import CloseBtn from '../components/views/search/cardbtn/CloseBtn'

const useModalView = (callback) => {
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
        console.log('turn')
        document.querySelector('.double-faced-card').classList.toggle('rotate-y');
        setTimeout(() => {
            // document.querySelectorAll('.turn-btn')[0].classList.toggle('d-none');
        }, 100);
    }

    const flipCard = () => {
        console.log('flip')
        document.querySelector('.modal-image').classList.toggle('rotate-180');
    }

    const rotateCard = () => {
        console.log('rotate')
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
                    {/* {children[2]} */}
                    <div className="double-faced-card">
                        {/* {children[2]} */}
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
        console.log(action.type)
        switch (action.type) {
            case ACTIONS.STATIC:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            {/* Passing handleCardView as callback @ SearchResult */}
                            <CloseBtn handleClick={callback} />
                        </SingleFacedCard>
                }
            case ACTIONS.ROTATE:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <CloseBtn handleClick={callback} />
                            <RotateBtn handleClick={rotateCard} />
                        </SingleFacedCard>
                }
            case ACTIONS.FLIP:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <CloseBtn handleClick={callback} />
                            <RotateBtn handleClick={flipCard} />
                        </SingleFacedCard>
                }
            case ACTIONS.TURN:
                return {
                    open: true,
                    component:
                        <DoubleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <CloseBtn handleClick={callback} />
                            <TurnBtn handleClick={turnCard} />
                        </DoubleFacedCard>
                }
            default:
                return INIT;
        }
    }

    const [view, dispatch] = useReducer(reducer, INIT)

    const updateCardView = (layout, expandedImage) => {
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
            case 'meld':
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

    return [view, updateCardView]
}

export default useModalView
