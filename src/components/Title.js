import React from 'react'

const Title = ({ classList, title }) => {
    return (
        <h2 className={classList}>
            {title}
        </h2>
    )
}

export default Title
