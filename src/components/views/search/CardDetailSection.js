import ApiCardDetail from './ApiCardDetail';
import CatalogCardDetail from './CatalogCardDetail';
import CollectionCardDetail from './CollectionCardDetail';

const CardDetailSection = (props) => {
    const { search, ...rest } = props;

    return (
        <>
            {search === 'catalog' ? (
                <CatalogCardDetail {...rest} />
            ) :
                search === 'collection' ? (
                    <CollectionCardDetail {...rest} />
                ) : (
                        <ApiCardDetail {...rest} />
                        )
            }
        </>
    )
}

export default CardDetailSection;
