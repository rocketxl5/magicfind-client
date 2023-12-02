import { useState, useEffect, forwardRef } from 'react';

const CardImage = forwardRef(function CardImage({ attributes, handleClick }, ref) {
    const { id, style, src, alt, placeholder } = attributes;
    // const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setHasLoaded(true);
        }
    }, [src])

    return (
        <div className="blur-load">
            {
                !hasLoaded ? (
                    <img id={id} className={style} src={placeholder} alt={alt} onClick={handleClick} ref={ref} />
                ) : (

                    <img id={id} className={style} src={src} alt={alt} onClick={handleClick} ref={ref} loading="lazy" />
                )
            }
        </div>
    )
})

export default CardImage;
