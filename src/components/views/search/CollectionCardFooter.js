import { useState, useEffect, forwardRef } from 'react';

const CollectionCardFooter = forwardRef(function (props, ref) {
    const { card, handleClick } = props;
    const { deleteRef, publishRef, unpublishRef } = ref;

    return (
        <div className="card-btns-wrapper">
            <div className="btn-container">
                < button id="delete-card" className="card-btn bg-red color-light" type="button" ref={deleteRef} onClick={handleClick}>
                    Delete
                </button>
            </div>
            {!card.isPublished ? (
                <div className="btn-container">
                    <button id="publish-card" className="card-btn bg-blue color-light" type="button" ref={publishRef} onClick={handleClick}>Publish</button>
                </div>
            ) : (
                <div className="btn-container">
                        <button id="unpublish-card" className="card-btn bg-yellow color-light" type="button" ref={unpublishRef} onClick={handleClick}>Unpublish</button>
                </div>
            )}
        </div>
    )
})

export default CollectionCardFooter
