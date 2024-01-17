import { useState, useEffect } from 'react'
import CardImage from './CardImage'
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import CloseBtn from './cardbtn/CloseBtn';

const SlideShow = (cards) => {
    return (
        <>

            <div className="slide-show">
                {
                    cards.map((card, index) => {
                        return (
                            <CardImage key={index} card={card} />
                        )
                    })
                }
                <button className="slide-btn slide-btn-left" type="button"><RxCaretLeft size={25} /></button>
                <button className="slide-btn slide-btn-right" type="button"><RxCaretRight size={25} /></button>
                <CloseBtn />
            </div>
        </>
    )
}

export default SlideShow
