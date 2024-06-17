import { useNavigate } from 'react-router-dom';
import Set from '../features/search/components/Set';
import useSearchContext from './contexthooks/useSearchContext';
import useModalContext from './contexthooks/useModalContext';

const useResults = () => {
    const navigate = useNavigate();

    const { setResults } = useSearchContext();
    const { setUris } = useModalContext();

    const handleArchive = (data) => {
        const results = new Map([
            [
                'uris',
                data.map(set => set.prints).flat()
                    .map(print => print?.image_uris ?
                        print?.image_uris.normal :
                        print?.card_faces.map(face => face.image_uris.normal))
            ],
            [
                'sets',
                data.map((set, i) => <Set key={i} id={set.id} prints={set.prints} />)
            ]
        ]);

        // Passing imgages uris to reducer function @ ModalContext,
        // updates uris reducer state which triggers loadImages custom hook function @ useLoadImages.
        // useLoadImages preloads and creates normal size images component modal ready if needed. 
        setUris(results.get('uris'));
        setResults(results.get('sets'));
    }

    const handleSearchResults = (data, props) => {
        // console.log(data)
        const { path, query, type } = props;
        switch (type) {
            case 'archive':
                handleArchive(data);
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
        localStorage.setItem('search-results', JSON.stringify({ data: data, props: props }))
        navigate(path, { state: { query: query } });
    }

    function handleCatalog(query, result) { }
    function handleCollection(query, result) { }

    return { handleSearchResults }
}

export default useResults
