import React from 'react'

const ExpandedImage = (props) => {
    const { attributes, display, setDisplay } = props;
    const handleClick = () => {
        console.log(attributes)
        setDisplay(false);
        // const expandedImage = document.querySelector('.expanded-image-container')
        // expandedImage.classList.remove = 'd-block';
    }
    return (
        <>
            {
                attributes &&

                <div className={`${display && 'd-flex'} expanded-image-container`} onClick={handleClick}>
                    <div className="expanded-image">
                        <img
                            {...attributes}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default ExpandedImage
