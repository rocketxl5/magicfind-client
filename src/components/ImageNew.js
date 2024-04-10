import { Link } from 'react-router-dom';
import useLazyLoader from '../hooks/useLazyLoader';
import useAttributes from '../hooks/useAttributes';

const ImageNew = ({ children, product, classList }) => {
    const { attributes } = useAttributes(product);
    const { id, style, src, alt, placeholder } = attributes;

    const { hasLoaded } = useLazyLoader(product);

    return (
        // <img className={classList} src={url} onClick={handleClick && handleClick} />
        <div className='lazyload-wrapper relative'>
            {
                !hasLoaded ? (
                    <img id={id} className={style} src={placeholder} alt={alt} />
                ) : (
                    // <Link to={`/product/${product.name}`}>
                    <img id={id} className={classList} src={src} alt={alt} loading="lazy" />
                    // </Link>
                )
            }
            {
                children
            }
        </div>
    )
}

export default ImageNew
