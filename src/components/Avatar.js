import Button from './Button.js';

const Avatar = ({ id = '', avatar, classList = '', handleClick }) => {
    // console.log(avatar.color)
    return (
        <Button
            id={'avatar'}
            classList={`nav-btn avatar-btn`}
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
