import React from 'react';
import { FaRegCircle } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";

const Indicator = ({ index = 0, currentIndicator }) => {
    return (
        <span key={index} className="indicator">
            {currentIndicator === index ? <FaRegCircleDot /> : <FaRegCircle />}
        </span>
    )
}

export default Indicator
