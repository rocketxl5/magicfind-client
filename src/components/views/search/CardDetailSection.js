import ApiCardDetail from './ApiCardDetail';
import CatalogCardDetail from './CatalogCardDetail';
import CollectionCardDetail from './CollectionCardDetail';

const CardDetailSection = (props) => {
    const { searchType, ...rest } = props;

    return (
        <section className="card-section">
            {searchType === 'search-catalog' ? (
                <CatalogCardDetail {...rest} />
            ) :
                searchType === 'search-collection' ? (
                    <CollectionCardDetail {...rest} />
                ) : (
                        <ApiCardDetail {...rest} />
                        )
            }
        </section>
    )
}

export default CardDetailSection;
