files with import api/resources.js @fetch path -> src/components/auth Login, Register, path -> src/components/views AddCard, CartItem, CatalogItem, ModifyCard, RemoveCard, SearchCatalog, SearchCollection, ShoppingCart, path -> src/components/views/mail ComposeMessage, Inbox, Message, Sidebar, path -> src/contexts CardContext, AuthContext

##############################
#### Search Card process ####
##############################

******* Main Components **********

1- Search Catalog : Query all users site wide published cards.
2- Search Store: Query user collection.
3- Search API: Query Skryfall cards api.


catalogInput -> useRef assigned to SearchCatalog component search input
storeInput -> useRef assigned to SearchCollection component search input
apiInput -> useRef assigned to SearchAPI component search input

The form Component takes a formID prop. This formID is passed down to SearchInput to assign the proper Text to the placeholder attribute. 
formID = 'search-catalog' => Search Magic Find
formID = 'search-collection' => Search your store (tbd Search your collection)
formID = 'search-api' => Search Skryfall api


Search components make use of SearchContext to share the state of the input field (searchInput, setSearchInput) which has focus and searchTerm value when text is inserted in input field (searchTerm, setSearchTerm).

@onFocus => setSearchInput(inputRef.current)

@onChange => setSearchTerm(e.target.value)

Each Search Component has a useEffect with a dependency array containing the searchInput state from the SearchContext. When focus change, searchInput changes and this change triggers the useEffect hook. 

useEffect(..., [searchInput]) check if the actual searchInput id matches the search component input ref (currentInput.current.id) returned by forwardRef (if(searchInput.id === catalogInput.id)) etc.
If true (only one of them since only one at a time can have focus) isActive state is set to true. else its set to false. 
searchInput is set to the currentInput (setSearchInput(currentInput.current)). 
 
isActive state is passed as prop to SearchInput component and is set as a condition to the value attribute of input field. 




######################
#### AUTOCOMPLETE ####
######################

SearchCatalog => 
[1] useEffect with searchTerm dependency array: fetch predictions data (setPredictionResults) from catalog route @ data/cardcatalog.jsos. Triggers an updata data on each keypress. 
[2] useEffect with predictionResults dependency array: filters results from previous fetch



###########################
#### States definition ####
###########################

searchTerm, setSearchTerm => 





