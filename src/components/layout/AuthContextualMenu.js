import { NavLink } from 'react-router-dom'

const AuthContextualMenu = () => {
    return (
        <div className="contextual-menu">
            <NavLink to='../me/dashboard' style={({ isActive }) => { }}><span>Dahsboard</span></NavLink>
            <NavLink to='../me/collection' style={({ isActive }) => { }}><span>Collection</span></NavLink>
            <NavLink to='../me/add-card' style={({ isActive }) => { }}><span>Add Card</span></NavLink>
        </div>
    )
}

export default AuthContextualMenu
