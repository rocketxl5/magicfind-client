import { useReducer } from 'react';
import RotateBtn from '../components/views/search/cardbtn/RotateBtn';
import TurnBtn from '../components/views/search/cardbtn/TurnBtn';
import SlideShow from '../components/views/search/SlideShow';

const useModalSlide = (callback, expandedImages) => {
    const ACTIONS = {
        SHOW: 'show',
        HIDE: 'hide',
    }

    const INIT = {
        open: false,
        component: null,
    }

    function turnCard(index) {
        console.log(index)
        document.querySelectorAll('.double-faced-card')[index]?.classList.toggle('rotate-y');
    }

    function flipCard() {
        document.querySelector('.modal-image').classList.toggle('rotate-180');
    }

    function rotateCard() {
        document.querySelector('.modal-image').classList.toggle('rotate-90');
    }

    function SingleFacedCard({ children, action }) {
        return (
            <div id={action} className="slide-view" >
                <div className="modal-slide-content">
                    <div className="single-faced-card">
                        {
                            action === 'static' ? (
                                children
                            ) : (
                                <>
                                    {children[0]}
                                    {children[1]}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    function DoubleFacedCard({ children, action }) {
        return (
            <div id={action} className="slide-view" >
                <div className="modal-slide-content">
                    {children[1]}
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

    function setSlideComponent(props, index) {
        const { layout, element } = props;

        switch (layout) {
            case 'flip':
                return (
                    <SingleFacedCard key={index} action='flip'>
                        {element}
                        <RotateBtn handleClick={flipCard} />
                    </SingleFacedCard>
                )
            case 'split':
            case 'planar':
                return (
                    <SingleFacedCard key={index} action='static'>
                        {element}
                        <RotateBtn handleClick={rotateCard} />
                    </SingleFacedCard>
                )
            case 'transform':
            case 'modal_dfc':
            case 'reversible_card':
            case 'double_faced_token':
            case 'art_series':
                return (
                    <DoubleFacedCard key={index} action='turn'>
                        {element}
                        <TurnBtn handleClick={() => turnCard(index)} />
                    </DoubleFacedCard>
                )
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
                return (
                    <SingleFacedCard key={index} action='static'>
                        {element}
                    </SingleFacedCard>
                )
            default:
                return INIT;
        }
    }

    const reducer = (view, action) => {
        switch (action.type) {
            case ACTIONS.SHOW:
                return {
                    open: true,
                    component:
                        <SlideShow handleClick={callback} setComponent={(props, index) => setSlideComponent(props, index)}>
                            <>
                                {
                                    action.payload.images
                                }
                            </>
                        </SlideShow>

                }
            case ACTIONS.HIDE:
                return INIT;
            default:
                console.log('Unknow Action')
        }
    }

    const [view, dispatch] = useReducer(reducer, INIT)

    const updateSliderView = (e) => {

        switch (e.target.name) {
            case 'feature-cover':
                dispatch({
                    type: 'show',
                    payload: {
                        images: expandedImages[parseInt(e.target.id)],
                    }
                })
                break;
            case 'close-btn':
                dispatch({
                    type: 'hide',
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
