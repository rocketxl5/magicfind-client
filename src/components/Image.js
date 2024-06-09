import useLazyLoader from '../hooks/useLazyLoader';

const Image = ({ classList, src }) => {
// const { hasLoaded } = useLazyLoader(src);

    return (
        <figure className='product-view'>
            <div className={`product-view-container`}>
                {/* <div className={`product-view-container ${product.finishes?.includes('foil') && 'is-foil'}`}> */}
                {
                    // !hasLoaded ? (
                    //     <img src={require('../assets/img/mtg_card_back.jpg')} alt='Magic back card' />
                    // ) : (
                        // <Link to={`/product/${product.name}`}>
                        <img
                            className={classList}
                        src={src}
                        alt={`Card`}
                            loading="lazy"
                        />
                        // </Link>
                    // )
                }
            </div>
        </figure>
    )
}

export default Image
