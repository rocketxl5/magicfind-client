import Avatar from '../Avatar';

const AuthBtn = ({ auth, panelRef }) => {

    return (
        <button
            className="nav-btn auth-nav-btn"
            style={
                { backgroundColor: `#${auth.avatar.color}` }
            }
            onClick={
                () => panelRef.current.classList.toggle('side-show')
            }
        >
            <Avatar auth={auth} />
        </button>

    )
}

export default AuthBtn;
