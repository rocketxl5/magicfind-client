import React from 'react'

const RequirementMessage = ({ requirement }) => {
    return (
        <p><i className={`${!requirement.fullfiled ? 'fa-regular fa-circle-xmark danger-color' : 'fa-solid fa-check success-color'} margin-inline-end-1`}></i>{requirement.text}</p>
    )
}

export default RequirementMessage
