import { NavLink } from 'react-router-dom'

const AuthContextualNav = ({ views }) => {

    return (
        <div className="contextual-links">
            {views.map((view, index) => {
                return (
                    <NavLink
                        key={index}
                        id={view.id}
                        to={view.path}
                        className={({ isActive }) => {
                            return isActive ? 'active-link' : 'inactive-link'
                        }}
                    >
                        <span >{view.title}</span>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default AuthContextualNav
