import useLazyLoader from '../hooks/useLazyLoader';
import useShowModal from '../hooks/useShowModal';

const Image = ({ classList, src }) => {
    const { hasLoaded } = useLazyLoader(src);
    const { setModal } = useShowModal();

    return (
        
        <figure className='product-view'>
           { !hasLoaded ? (
                <img className='print-radius' src={require('../assets/img/mtg_card_back.jpg')} alt='Magic back card' />
            ) : (
                // <Link to={`/product/${product.name}`}>
                <img
                    className={classList}
                        src={src}
                        alt={`Card`}
                        onClick={() => setModal({ type: 'caroussel', content: 'Image of me' })}
                    loading="lazy"
                />
                // </Link>
                )}
        </figure>
            // <div className={`product-view-container`}>
                //  <div className={`product-view-container ${product.finishes?.includes('foil') && 'is-foil'}`}> 
                // 
        //     </div>
    )
}

export default Image
