import { NavLink, useLocation } from 'react-router-dom'

const AuthContextualNav = ({ views }) => {
    const location = useLocation()

    return (
        <section className="contextual-nav">
        <div className="contextual-links">
            {views.map((view, index) => {
                console.log(location)
                return (
                    <NavLink
                        key={index}
                        id={view.id}
                        to={`/me/${view.id}`}                        
                        className={({ isActive }) => {
                            // If search param is defined and is equal to view.id, deactivate link 
                            return isActive && location?.state?.search !== view.id ? 'active-link' : 'inactive-link'
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
