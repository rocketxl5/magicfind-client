import React from 'react'
import RequirementMessage from './RequirementMessage'

const Requirements = ({ inputState }) => {

    console.log(inputState)
    return (
        <div className="requirements-container">
            <div className="requirements-wrapper">


                <div className="requirements-message">
                    {
                        inputState &&
                        inputState.map((requirement, index) => {
                            return <RequirementMessage key={index} requirement={requirement} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Requirements
