import { useState, useEffect } from 'react';

const CardImage = ({ attributes }) => {
    const { id, style, src, alt, placeholder } = attributes;

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
                    <img id={id} className={style} src={placeholder} alt={alt} />
                ) : (

                        <img id={id} className={style} src={src} alt={alt} loading="lazy" />
                )
            }
        </div>
    )
}

export default CardImage;
