import React from 'react'
import CloseBtn from './buttons/CloseBtn';
import Div from '../../components/Div';

const SlideView = ({ children, handleClick }) => {
    console.log(children)
    return (
        <Div className={"slide-view"}>
            <Div className={"slide-frame"}>
                <CloseBtn style={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
            </Div>
            <>
                {children}
            </>
        </Div>
    )
}

export default SlideView
