import { TbRotate360 } from "react-icons/tb";

const ExpandedImage = (props) => {
    const { attributes, expandedImageOvelay, setExpandedImageOvelay } = props;

    const handleClick = () => {
        setExpandedImageOvelay(false);
    }

    return (
        <>
            {
                attributes &&
                <div className={`${expandedImageOvelay && 'd-flex'} overlay-container`} onClick={handleClick}>
                    <div className="ovelay-image">
                            <img {...attributes} />
                    </div>
                </div>
            }
        </>
    )
}

export default ExpandedImage
