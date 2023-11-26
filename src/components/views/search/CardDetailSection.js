import ApiCardDetail from './ApiCardDetail';
import CatalogCardDetail from './CatalogCardDetail';
import CollectionCardDetail from './CollectionCardDetail';

const CardDetailSection = (props) => {
    const { searchType } = props;

    return (
        <section className="card-section">
            {searchType === 'search-catalog' ? (
                <CatalogCardDetail {...props} />
            ) :
                searchType === 'search-collection' ? (
                    <CollectionCardDetail {...props} />
                ) : (
                        <ApiCardDetail {...props} />
                        )
            }
        </section>
    )
}

export default CardDetailSection;
