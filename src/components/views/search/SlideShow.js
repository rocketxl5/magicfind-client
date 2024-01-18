import { useState, useEffect } from 'react'
import CardImage from './CardImage'
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
// import CloseBtn from './cardbtn/CloseBtn';

const SlideShow = ({ children, handleSliderView }) => {
    console.log(children)
    return (
        <>

            <div className="slide-show" onClick={handleSliderView}>
                {
                    children.map(child => child)
                }
                <button className="slide-btn slide-btn-left" type="button"><RxCaretLeft size={25} /></button>
                <button className="slide-btn slide-btn-right" type="button"><RxCaretRight size={25} /></button>
                {/* <CloseBtn /> */}
            </div>
        </>
    )
}

export default SlideShow
