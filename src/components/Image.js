import useLazyLoader from '../hooks/useLazyLoader';
import useModal from '../hooks/useModal';

const Image = ({ classList, src, index }) => {
    const { hasLoaded } = useLazyLoader(src);
    const { handleSetModal } = useModal();
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
                        onClick={() => handleSetModal({ type: 'slide', content: index })}
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
