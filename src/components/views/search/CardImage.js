import { useState, useEffect, forwardRef } from 'react';

const CardImage = forwardRef(function CardImage({ attributes, handleClick }, ref) {
    const { id, style, src, alt, placeholderSrc } = attributes;
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src)
        }
    }, [src])

    return (
        <img id={id} className={style} src={imgSrc} alt={alt} onClick={handleClick} ref={ref} />
    )
})

export default CardImage;
