import useNav from '../../hooks/useNav';

const Hamburger = () => {
    const { displayMenu, setDisplayMenu } = useNav();

    return (
        <label htmlFor="mobile-nav" className="hamburger mobile-nav-label" onClick={() => setDisplayMenu(!displayMenu)}>
            <span></span>
        </label>
    )
}

export default Hamburger;
