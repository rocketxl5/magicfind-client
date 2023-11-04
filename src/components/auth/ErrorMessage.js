import React from 'react'

const ErrorMessage = (props) => {
    const { message, error } = props;
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
