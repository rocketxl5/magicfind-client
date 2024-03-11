import useNavbar from './contexthooks/useNavbar';

const useSearchBtn = (hamburgerRef, catalogInputRef) => {
    const {
        setDisplaySearchBar
    } = useNavbar();

    /**************************************/
    //            MOBILE ONLY
    // Handle Navbar Search button event 

    /**************************************/
    const searchBtnHandler = () => {
        // Trigger search bar display   
        setDisplaySearchBar(true);

        // Change aria-expanded attribute to trigger "Open" hamburger animation 
        // @ navbar.css
        hamburgerRef.current?.setAttribute('aria-expanded', 'true');
        hamburgerRef.current.disabled = true;
        // Set focus on Catalog Search Input
        catalogInputRef.current?.focus();
    }
    return { searchBtnHandler };
}

export default useSearchBtn
