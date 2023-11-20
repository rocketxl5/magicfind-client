import ApiCardDetail from './ApiCardDetail';
import CatalogCardDetail from './CatalogCardDetail';
import CollectionCardDetail from './CollectionCardDetail';
const CardDetailSection = (props) => {
    const { card, searchType } = props;


    return (
        <section className="card-section">
            {
                searchType === 'search-api' ?
                    (
                        <ApiCardDetail card={card} />
                    ) :
                    searchType === 'search-catalog' ?
                        (
                            <CatalogCardDetail card={card} />
                        ) : (
                            <CollectionCardDetail card={card} />
                        )
            }
        </section>
    )
}

export default CardDetailSection
