import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import card_back from '../assets/img/mtg_card_back.jpg';
import useLazyLoader from '../hooks/useLazyLoader';

const Image = ({ product }) => {
    const { hasLoaded } = useLazyLoader(product);

    return (
        <div className='height-100'>
            {
                !hasLoaded ? (
                    <img id='expand-card' src={require('../assets/img/mtg_card_back.jpg')} alt='Magic back card' />
                ) : (
                    // <Link to={`/product/${product.name}`}>
                        <img id='expand-card' className='card-image' src={product.image_uris?.normal || product.card_faces[0].image_uris?.normal} alt={`${product.name} card`} loading="lazy" />
                    // </Link>
                )
            }
        </div>
    )
}

export default Image
