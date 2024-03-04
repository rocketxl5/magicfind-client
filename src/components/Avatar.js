import Button from './Button.js';

const Avatar = ({ avatar, classList = '', handleClick }) => {
    // console.log(avatar.color)
    return (
        <Button
            classList={`nav-btn avatar-btn ${classList}`}
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
