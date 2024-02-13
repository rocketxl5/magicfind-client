const Avatar = ({ auth }) => {

    return (
        auth?.avatar.src ? (
            <img src={auth?.avatar.src} alt="Avatar" />
                ) : (
                <>
                    {auth?.avatar.letter}
                </>
            )
    )
}

export default Avatar
