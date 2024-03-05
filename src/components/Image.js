import React from 'react'

const Image = ({ classList = '', url, handleClick }) => {
    return (
        <img className={classList} src={url} onClick={handleClick && handleClick} />
    )
}

export default Image
