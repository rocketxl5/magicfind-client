import { NavLink } from 'react-router-dom'

const AuthContextualMenu = ({ paths }) => {
    return (
        <div className="contextual-menu">
            {paths.map((path, index) => {
                return <NavLink key={index} to={`../me/${path.toLowerCase()}`} className={({ isActive }) => { return isActive ? 'active-link' : 'inactive-link' }}><span>{path}</span></NavLink>
            })}
        </div>
    )
}

export default AuthContextualMenu
