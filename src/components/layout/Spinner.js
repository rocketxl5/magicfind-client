import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner-container flex flex-column align-center col-12">
            <div className="col-12 center">
                <div className="spinner">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw spinner-icon"></i>
                </div>
                <p>Please wait while we retrieve your data...</p>
            </div>
        </div>
    )
}

export default Spinner;