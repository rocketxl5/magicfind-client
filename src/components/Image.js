import useLazyLoader from '../hooks/useLazyLoader';

const Image = ({ classList, product }) => {
    const { hasLoaded } = useLazyLoader(product);

    return (
        <figure className='product-view'>
            <div className={`product-view-container ${product.finishes?.includes('foil') && 'is-foil'}`}>
                {
                    !hasLoaded ? (
                        <img src={require('../assets/img/mtg_card_back.jpg')} alt='Magic back card' />
                    ) : (
                        // <Link to={`/product/${product.name}`}>
                        <img
                            className={classList}
                            src={product.image_uris?.normal || product.card_faces[0].image_uris?.normal}
                            alt={`${product.name} card`}
                            loading="lazy"
                        />
                        // </Link>
                    )
                }
            </div>
        </figure>
    )
}

export default Image
