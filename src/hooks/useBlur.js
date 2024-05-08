import useSearch from './contexthooks/useSearch';
import useNavbar from './contexthooks/useNavbar';
/*****************************************/
// Updates States and Refs on search input blur
// @ catalog [searchbar] input
// @ collection input
// @ archive input
/*****************************************/
const useBlur = () => {
    const { displaySearchBar, setDisplaySearchBar, setIsSearchBarDisplayed } = useNavbar();
    const { setCardName, setMarker, setSearchTerm, setCardNames, setSearchInput } = useSearch();

    const updateBlur = (isSubmit = false) => {
        setMarker(-1);
        setSearchTerm('');
        // If searchbar is displayed (mobile & catalog searhc only) 
            if (displaySearchBar) {
                // hide searchbar
                setDisplaySearchBar(false);
                if (isSubmit) {
                    setIsSearchBarDisplayed(false);
                }
            }
            // Reinitialize input state if catalog
            // Query is triggered each time search catalog has focus
            // making sure search catalog cardnames is updated with latest results 
        setSearchInput(null);
            setCardName('');
        setCardNames(null);
    }
    return { updateBlur }
}

export default useBlur
