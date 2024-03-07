import useMenu from '../../hooks/contexthooks/useMenu';

const Hamburger = () => {
    const { displayMenu, setDisplayMenu } = useMenu();

    return (
        <label htmlFor="mobile-nav" className="hamburger mobile-nav-label" onClick={() => setDisplayMenu(!displayMenu)}>
            <span></span>
        </label>
    )
}

export default Hamburger;
