import useNavbar from './contexthooks/useNavbar';
import useSearch from './contexthooks/useSearch';
/*****************************************/
// Updates States and Refs on search input blur
// @ catalog [searchbar] input
// @ collection input
// @ archive input
/*****************************************/
const useFocus = () => {
    const { displaySearchBar, setDisplaySearchBar } = useNavbar();
    const { searchInput, setSearchInput } = useSearch();

    const updateFocus = (target) => {

        if (searchInput?.id !== target.id) {
            setSearchInput(target);
        }
        // If mobile searchbar is displayed
        if (displaySearchBar) {
            // Set searchbar state to false [close]
            setDisplaySearchBar(false);
        }
    }

    return { updateFocus }
}

export default useFocus
