import Menu from './Menu';
import NavIcons from './NavIcons';
import useNav from '../../hooks/contexthooks/useNav.js';

function Navbar() {
    const { checkboxRef } = useNav();

    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" defaultChecked={false} ref={checkboxRef} />
            <NavIcons />
            <Menu />
        </div>
    )
}

export default Navbar;