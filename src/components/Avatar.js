import Button from './Button.js';

const Avatar = ({ id, classList, content, style, handleClick }) => {

    return (
        <Button
            id={id}
            classList={classList}
            style={style}
            handleClick={handleClick}
        >
            {content}
        </Button>
    )
}

export default Avatar
