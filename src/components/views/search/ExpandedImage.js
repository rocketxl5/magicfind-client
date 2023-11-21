import { TbRotate360 } from "react-icons/tb";

const ExpandedImage = (props) => {
    const { attributes, layout, display, setDisplay } = props;

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
