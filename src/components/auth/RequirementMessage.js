import React from 'react'

const RequirementMessage = ({ requirement }) => {
    return (
        <p><i className={`${!requirement.fullfiled ? 'fa-regular fa-circle-xmark danger' : 'fa-solid fa-check success'} margin-inline-end-1`}></i>{requirement.text}</p>
    )
}

export default RequirementMessage
