import React from 'react'

const Image = ({ classList, url }) => {
    return (
        <img className={classList} src={url} />
    )
}

export default Image
