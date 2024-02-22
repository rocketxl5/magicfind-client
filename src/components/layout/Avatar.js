const Avatar = ({ auth }) => {

    return (
        auth.user?.avatar?.src ? (
            <img src={auth.user.avatar.src} alt="Avatar" />
                ) : (
                <>
                    {auth.user.avatar.letter}
                </>
            )
    )
}

export default Avatar
