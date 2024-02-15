import { useState, useEffect } from 'react';
import { FaExpand } from "react-icons/fa";
import Loading from '../../layout/Loading';
import useExpandImage from '../../../hooks/useExpandImage';
import useAttributes from '../../../hooks/useAttributes';

const ProductImage = ({ card, loading, handleClick }) => {
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
        // expandedImage &&
        <section className="product-image">
            {
                loading ? (
                    <Loading />
                ) : (

                    <div className="lazy-load" >
                        {
                            !hasLoaded ? (
                                <img id={id} className={style} src={placeholder} alt={alt} />
                            ) : (

                                <img id={id} className={style} src={src} alt={alt} loading="lazy" />
                            )
                        }
                        <button className="card-icon-container expand-btn" type="button" onClick={(e) => handleClick(e, card.layout, expandedImage)}>
                            <FaExpand />
                        </button>
                    </div>
                )
            }
        </section>
    )
}

export default ProductImage
