import React from 'react'

const Button = (props) => {
    const { attributes, eventHandler } = props;
    const { style, type, value } = attributes;
    console.log(attributes)
    return (
        <button className={style} type={type} onClick={eventHandler}>{value}</button>
    )
}

export default Button
