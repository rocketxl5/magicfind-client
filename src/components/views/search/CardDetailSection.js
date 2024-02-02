import ApiCardDetail from './ApiCardDetail';
import CatalogCardDetail from './CatalogCardDetail';
import CollectionCardDetail from './CollectionCardDetail';

const CardDetailSection = (props) => {
    const { searchType, ...rest } = props;

    return (
        <>
            {searchType === 'search-catalog' ? (
                <CatalogCardDetail {...rest} />
            ) :
                searchType === 'search-collection' ? (
                    <CollectionCardDetail {...rest} />
                ) : (
                        <ApiCardDetail {...rest} />
                        )
            }
        </>
    )
}

export default CardDetailSection;
