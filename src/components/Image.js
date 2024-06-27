import useLazyLoader from '../hooks/useLazyLoader';
import useModal from '../hooks/useModal';

const Image = (props) => {
    const { classList, src, ...rest } = props; 
    const { hasLoaded } = useLazyLoader(src);
    const { setShowModal } = useModal();

    return (
        
        <figure className='product-view'>
           { !hasLoaded ? (
                <img className='print-radius' src={require('../assets/img/mtg_card_back.jpg')} alt='Magic back card' />
            ) : (
                    <img
                        className={classList}
                        src={src}
                        alt={`MTG card`}
                        onClick={() => setShowModal({ type: 'slide', ...rest })}
                        loading="lazy"
                    />
                )}
        </figure>
    )
}

export default Image