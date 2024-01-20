import React from 'react'

const SingleFaceCard = ({ children, action }) => {
    return (
        <div id={action} className="slide-view" >
            <div className="modal-slide-content">
                <div className="single-faced-card">
                    {
                        action === 'static' ? (
                            children
                        ) : (
                            <>
                                {children[0]}
                                {children[1]}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleFaceCard
