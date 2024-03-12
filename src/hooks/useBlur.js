import useNavbar from './contexthooks/useNavbar';
import useSearch from './contexthooks/useSearch';
import useViewport from './contexthooks/useViewport';
/*****************************************/
// Updates States and Refs on search input blur
// @ catalog [searchbar] input
// @ collection input
// @ archive input
/*****************************************/
const useBlur = () => {
    const { isMobile } = useViewport();
    const { displaySearchBar, setDisplaySearchBar, hamburgerRef } = useNavbar();
    const { setMarker, setSearchTerm, setSearchInput, setCardNames } = useSearch();

    const updateBlur = (id) => {
        setMarker(-1);
        setSearchTerm('');
        // If search input is Catalog 
        if (id === 'catalog') {
            // If Mobile
            if (displaySearchBar && isMobile) {
                // Hides searchbar @ NavbarContext
                setDisplaySearchBar(false);
            }
            // Reinitialize input state if catalog 
            // Query is triggered each time search catalog has focus
            // making sure search catalog cardnames is updated with latest results 
            setSearchInput(null);
            setCardNames(null);
        }
    }

    return { updateBlur }
}

export default useBlur
