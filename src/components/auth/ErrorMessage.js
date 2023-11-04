import React from 'react'

const ErrorMessage = ({ message }) => {
// console.log(message)
    return (
        <div className="input-message">
            <div className="input-message-inner">
                <p>
                    {message}
                </p>
            </div>
        </div>
    )
}

export default ErrorMessage
