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
    const { setMarker, setSearchTerm, setSearchInput, setCardNames } = useSearch();

    const updateBlur = (id) => {
        // console.log(displaySearchBar)
        setMarker(-1);
        setSearchTerm('');
        // If input is Catalog 
        if (id === 'catalog') {
            // If Mobile
            if (displaySearchBar) {
                blurHandler();
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
