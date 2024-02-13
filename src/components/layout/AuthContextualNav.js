import { NavLink } from 'react-router-dom'

const AuthContextualNav = ({ views }) => {

    return (
        <section className="contextual-nav">
        <div className="contextual-links">
            {views.map((view, index) => {
                return (
                    <NavLink
                        key={index}
                        id={view.id}
                        to={`/me/${view.id}`}
                        className={({ isActive }) => {
                            return isActive ? 'active-link' : 'inactive-link'
                        }}
                    >
                        <span >{view.title}</span>
                    </NavLink>
                )
            })}
        </div>
        </section>
    )
}

export default AuthContextualNav
