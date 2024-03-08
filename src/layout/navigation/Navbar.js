import Menu from './Menu';
import NavIcons from './NavIcons';
import useMenu from '../../hooks/contexthooks/useMenu';

function Navbar() {
    const { checkboxRef } = useMenu();

    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" ref={checkboxRef} />
            <NavIcons />
            <Menu />
        </div>
    )
}

export default Navbar;