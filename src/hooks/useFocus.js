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
    const { inputValue, setInputValue, searchInput, setSearchInput } = useSearch();

    const updateFocus = (target) => {
        // If previous input is different from current one
        if (searchInput?.id !== target.id) {
            // Clear search input
            setInputValue('');
            // Set searchInput with current one
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
