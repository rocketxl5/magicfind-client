import React from 'react'
import CloseBtn from './buttons/CloseBtn';
import Container from '../../components/Container';

const SlideView = ({ children, handleClick }) => {
    console.log(children)
    return (
        <Container classList={"slide-view"}>
            <Container classList={"slide-frame"}>
                <CloseBtn classList={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
            </Container>
            <>
                {children}
            </>
        </Container>
    )
}

export default SlideView
