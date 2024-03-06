import Button from './Button.js';

const Avatar = ({ avatar, handleClick }) => {

    return (
        <Button
            id={'avatar'}
            classList={`nav-btn avatar`}
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
