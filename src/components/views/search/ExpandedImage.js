import React from 'react'

const ExpandedImage = (props) => {
    const { attributes, display, setDisplay } = props;

    const handleClick = () => {
        setDisplay(false);
    }

    return (
        <>
            {
                attributes &&
                <div className={`${display && 'd-flex'} expanded-image-container`} onClick={handleClick}>
                    <div className="expanded-image">
                            <img {...attributes} />
                    </div>
                </div>
            }
        </>
    )
}

export default ExpandedImage
