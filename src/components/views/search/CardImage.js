import { useState, useEffect } from 'react';
import { FaExpand } from "react-icons/fa";
import useExpandImage from '../../../hooks/useExpandImage';
import useAttributes from '../../../hooks/useAttributes';

const CardImage = ({ card, handleCardView }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { attributes } = useAttributes(card);
    const { expandedImage } = useExpandImage(card);
    const { id, style, src, alt, placeholder } = attributes;

    useEffect(() => {
        const img = new Image();
        img.src = card?.image_uris?.small || card?.card_faces[0]?.image_uris?.small;
        img.onload = () => {
            setHasLoaded(true);
        }
    }, [card])

    return (
        expandedImage &&
        <div className="lazy-load" >
            {
                !hasLoaded ? (
                        <img id={id} className={style} src={placeholder} alt={alt} />
                ) : (

                            <img id={id} className={style} src={src} alt={alt} loading="lazy" />
                )
            }
                <button className="card-icon-container expand-btn" type="button" onClick={(e) => handleCardView(e, card.layout, expandedImage)}>
                    <FaExpand />
                </button>
        </div>
    )
}

export default CardImage;
