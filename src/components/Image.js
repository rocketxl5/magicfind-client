import useLazyLoader from '../hooks/useLazyLoader';
import useModalContext from '../hooks/contexthooks/useModalContext';

const Image = ({ classList, index, src, layout }) => {
    const { hasLoaded } = useLazyLoader(src);
    const { handleModalProps } = useModalContext();

    return (
        
        <figure className='product-view'>
           { !hasLoaded ? (
                <img className='print-radius' src={require('../assets/img/mtg_card_back.jpg')} alt='Magic back card' />
            ) : (
                <img
                    className={classList}
                        src={src}
                        alt={`Card`}
                        onClick={(e) => handleModalProps({ type: 'slide', index: index, layout: layout })}
                    loading="lazy"
                    />
                )}
        </figure>
    )
}

export default Image
