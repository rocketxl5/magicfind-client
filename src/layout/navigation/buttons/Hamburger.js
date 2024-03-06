import useNav from '../../../hooks/useNav';

const Hamburger = () => {
    const { isOpen, setIsOpen } = useNav();

    return (
        <label htmlFor="mobile-nav" className="hamburger-btn mobile-nav-label" onClick={() => setIsOpen(!isOpen)}>
            <span></span>
        </label>
    )
}

export default Hamburger;
