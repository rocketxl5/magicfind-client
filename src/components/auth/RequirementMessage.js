import React, { useState, useEffect } from 'react'

const RequirementMessage = (props) => {
    const { requirement, value, input } = props;
    const [fullfiled, setFullfiled] = useState(false);

    useEffect(() => {


        if (document.activeElement === input.current && requirement.pattern) {

            requirement.pattern.test(value) && setFullfiled(true);
            // console.log(/lard/.test(value))
        }

    }, [value])
    return (
        <p><i className={`${!fullfiled ? 'fa-regular fa-circle-xmark danger' : 'fa-solid fa-check success'} margin-inline-end-1`}></i>{requirement.text}</p>
    )
}

export default RequirementMessage
