import { useNavigate } from 'react-router-dom';
import Set from '../features/search/components/Set';
import useModalContext from './contexthooks/useModalContext';
import useSearchContext from './contexthooks/useSearchContext';

const useResults = () => {
    const navigate = useNavigate();

    const { setResults } = useSearchContext();
    const { handleSetModal } = useModalContext();


    const handleSearchResults = (data, props) => {

        const { path, query, type } = props;

        const uris = data.map(set => set.prints).flat()
            .map(print => print?.image_uris ?
                print?.image_uris.normal :
                print?.card_faces.map(face => face.image_uris.normal));

        if (uris) {

            handleSetModal({ type: 'search-results', data: uris });
        }

        switch (type) {
            case 'archive':
                setResults(data.map((set, i) => <Set key={i} id={set.id} prints={set.prints} />));
                break;
            case 'catalog':
                handleCatalog(data);
                break;
            case 'collection':
                handleCollection(data);
                break;

            default:
                console.log('unknown search')
                break;
        }
        localStorage.setItem('search-results', JSON.stringify({ data: data, props: props }));
        navigate(path, { state: { query: query } });
    }

    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { handleSearchResults }
}

export default useResults
