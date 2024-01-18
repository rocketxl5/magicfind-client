import { useState, useEffect, useReducer } from 'react';
import RotateBtn from '../components/views/search/cardbtn/RotateBtn';
import TurnBtn from '../components/views/search/cardbtn/TurnBtn';
import CloseBtn from '../components/views/search/cardbtn/CloseBtn';
import LeftBtn from '../components/views/search/cardbtn/LeftBtn';
import RightBtn from '../components/views/search/cardbtn/RightBtn';
import SlideShow from '../components/views/search/SlideShow';

const useModalSlide = (callback, expandedImages) => {
    const INIT = {
        open: false,
        component: null
    }
    const ACTIONS = {
        STATIC: 'static',
        FLIP: 'flip',
        ROTATE: 'rotate',
        TURN: 'turn',
        SHOW: 'show',
        LEFT: 'left',
        RIGHT: 'right',
    }

    function turnCard(index) {
        console.log(index)
        document.querySelectorAll('.double-faced-card')[index]?.classList.toggle('rotate-y');
    }

    function flipCard() {
        console.log('flip')
        document.querySelector('.modal-image').classList.toggle('rotate-180');
    }

    function rotateCard() {
        console.log('rotate')
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

    function SlideShow({ children }) {
        const [slides, setSlides] = useState(null);
        const elements = children.props.children;

        useEffect(() => {
            const images = children.props.children[0];
            const components = []
            images.forEach((image, i) => {
                console.log(image)
                const component = wrapedComponent(image.layout, image.element, i)
                components.push(component)
            });
            setSlides(components)
        }, [children])

        console.log(slides)
        return (
            <>
                <div className="slide-show">
                    <div className="slide-track">
                        <>
                            {
                                slides &&
                                slides.map(slide => {
                                    return (
                                        <>
                                            {slide}
                                        </>
                                    )
                                })
                            }
                        </>
                    </div>
                    {elements[1]}
                    {elements[2]}
                    {elements[3]}
                </div>
            </>
        )
    }

    function wrapedComponent(layout, image, index) {
        console.log(index)
        switch (layout) {
            case 'flip':
                return (
                    <SingleFacedCard key={index} action='flip'>
                        {image}
                        <RotateBtn handleClick={flipCard} />
                    </SingleFacedCard>
                )
            case 'split':
            case 'planar':
                return (
                    <SingleFacedCard key={index} action='static'>
                        {image}
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
                        {image}
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
                        {image}
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
                        // <div className="modal-view">
                        //     <div className="modal-view-content">
                        <SlideShow>
                            <>
                                {action.payload.images}
                                <LeftBtn style={`slide-btn slide-left-btn`} handleClick={callback} />
                                <RightBtn style={`slide-btn slide-right-btn`} handleClick={callback} />
                                <CloseBtn style={`slide-close-btn close-btn card-btn`} handleClick={callback} />
                            </>
                        </SlideShow>
                    //     </div>
                    // </div>
                }
            case ACTIONS.STATIC:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                        </SingleFacedCard>
                }
            case ACTIONS.ROTATE:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <RotateBtn handleClick={rotateCard} />
                        </SingleFacedCard>
                }
            case ACTIONS.FLIP:
                return {
                    open: true,
                    component:
                        <SingleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <RotateBtn handleClick={flipCard} />
                        </SingleFacedCard>
                }
            case ACTIONS.TURN:
                return {
                    open: true,
                    component:
                        <DoubleFacedCard action={action.type}>
                            {action.payload.expandedImage}
                            <TurnBtn handleClick={turnCard} />
                        </DoubleFacedCard>
                }
            default:
                return INIT;
        }
    }

    const [view, dispatch] = useReducer(reducer, INIT)

    const updateSliderView = (e) => {
        console.log(e.target)
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
                    type: undefined,
                })
                break;
            default:
        }

    }

    return [view, updateSliderView]
}

export default useModalSlide
