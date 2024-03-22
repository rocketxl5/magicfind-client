import React from 'react';
import useLazyLoader from '../hooks/useLazyLoader';
import useAttributes from '../hooks/useAttributes';

const Image = ({ classList = '', product, handleClick }) => {
    const { attributes } = useAttributes(product);
    const { id, style, src, alt, placeholder } = attributes;

    const { hasLoaded } = useLazyLoader(product);
    return (
        // <img className={classList} src={url} onClick={handleClick && handleClick} />
        <section className={classList}>

            <div className="lazy-load" >
                {
                    !hasLoaded ? (
                        <img id={id} className={style} src={placeholder} alt={alt} />
                    ) : (

                        <img id={id} className={style} src={src} alt={alt} loading="lazy" />
                    )
                }
            </div>
        </section>
    )
}

export default Image
