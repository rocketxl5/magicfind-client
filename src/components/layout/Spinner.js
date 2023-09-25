import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner">
            <i className="fa fa-spinner fa-pulse fa-4x fa-fw spinner-icon"></i>
            <p className="spinner-message">Please hold while we retrieve your data...</p>
        </div>

    )
}

export default Spinner;