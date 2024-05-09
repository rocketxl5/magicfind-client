import useSearch from './contexthooks/useSearch';
import useNavbar from './contexthooks/useNavbar';
import useNavButton from './useNavButton';
/*****************************************/
// Updates States and Refs on search input blur
// @ catalog [searchbar] input
// @ collection input
// @ archive input
/*****************************************/
const useBlur = () => {
    const { blurHandler } = useNavButton();
    const { setMarker, setSearchTerm, setCardNames, setSearchInput, searchInput } = useSearch();

    const updateBlur = (catalog) => {
    // Reinitialize input state if catalog
    // Query is triggered each time search catalog has focus
    // making sure search catalog cardnames is updated with latest results 
        setMarker(-1);
        setSearchTerm('');
        // If searchbar is displayed (mobile & catalog searhc only) 
        if (catalog) {
            blurHandler();
        }
        setSearchInput(null);
        setCardNames(null);

    }
    return { updateBlur }
}

export default useBlur
