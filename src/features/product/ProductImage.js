import { useState, useEffect } from 'react';
import { FaExpand } from "react-icons/fa";
import Loading from '../../layout/Loading';
import useExpandImage from '../../hooks/useExpandImage';
import useAttributes from '../../hooks/useAttributes';

const ProductImage = ({ product, loading, handleSlideView }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { attributes } = useAttributes(product);
    const { expandedImage } = useExpandImage(product);
    const { id, style, src, alt, placeholder } = attributes;

    useEffect(() => {
        const img = new Image();
        img.src = product?.image_uris?.small || product?.card_faces[0]?.image_uris?.small;
        img.onload = () => {
            setHasLoaded(true);
        }
    }, [product])

    // console.log(product.layout)

    return (
        // expandedImage &&
        <section className="product-image border-success">
            {
                loading ? (
                    <Loading />
                ) : (
                        <button className="slide-view-btn" name="slide-view-btn" onClick={(e) => handleSlideView(e, product.layout, expandedImage)}>
                            <div className="lazy-load border-danger" >
                        {
                            !hasLoaded ? (
                                <img id={id} className={style} src={placeholder} alt={alt} />
                            ) : (

                                <img id={id} className={style} src={src} alt={alt} loading="lazy" />
                            )
                        }
                                <span className="card-icon-container expand-icon" type="button" >
                                    <FaExpand />
                                </span>
                            </div>
                        </button>
                )
            }
        </section>
    )
}

export default ProductImage
