import useNavButton from './useNavButton';
import useSearch from './contexthooks/useSearch';
import useNavbar from './contexthooks/useNavbar';
/*****************************************/
// Updates States and Refs on search input blur
// @ catalog [searchbar] input
// @ collection input
// @ archive input
/*****************************************/
const useBlur = () => {
    const { blurHandler } = useNavButton();
    const { displaySearchBar } = useNavbar();
    const { setCardName, setMarker, setSearchTerm, setSearchInput, searchInput, setCardNames } = useSearch();

    const updateBlur = (id, setInputValue) => {
        setMarker(-1);
        setSearchTerm('');
        setInputValue('');
        // If input is Catalog 
        if (id === 'catalog') {
            // If searchbar is displayed (mobile only)
            if (displaySearchBar) {
                // hide searchbar
                blurHandler();
            }
            // Reinitialize input state if catalog 
            // Query is triggered each time search catalog has focus
            // making sure search catalog cardnames is updated with latest results 
            console.log(searchInput.value)
            setSearchInput(null);
            setCardName('');
            setCardNames(null);
        }
    }
    return { updateBlur }
}

export default useBlur
