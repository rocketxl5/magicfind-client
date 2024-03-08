import Button from './Button.js';

const Avatar = ({ id = '', classList = '', avatar, handleClick }) => {

    return (
        <Button
            id={id}
            classList={`${classList} avatar-icon`}
            style={
                { backgroundColor: `#${avatar.color}` }
            }
            handleClick={handleClick}
        >
            {avatar?.src ? (
                <img src={avatar.src} alt="Avatar" />
            ) : (
                <>
                    {avatar.letter}
                </>
            )}
        </Button>
    )
}

export default Avatar
