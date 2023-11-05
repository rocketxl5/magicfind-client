import React from 'react'
import RequirementMessage from './RequirementMessage'

const Requirements = (props) => {
    const { requirements } = props
    // console.log(value)
    // console.log(requirements)
    return (
        <div className="validation-container">
            <div className="validation-wrapper">
                <div className="validation-message">
                    {
                        requirements &&
                        requirements.map((requirement, index) => {
                            return <RequirementMessage key={index} requirement={requirement} {...props} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Requirements
