import { useState, useEffect, useRef, createElement } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
import Button from '../../layout/Button';
import Modal from './Modal';
import DeleteCard from './DeleteCard';
import card_back from '../../../assets/img/card_back.jpg'
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';
import useModal from '../../../hooks/useModal';

const Card = (props) => {
    const { card, searchType } = props;
    const [loading, setLoading] = useState(false);
    const [ExpandedCard, setExpandedCard] = useState(null);

    const image_uris = card?.image_uris || card?.card_faces[0].image_uris;
    const imgAttributes = {
        id: "",
        style: 'card-image b-radius-10',
        src: image_uris.small,
        alt: `${card.name} image`,
        placeholderSrc: card_back
    }

    // Create expanded image component
    useEffect(() => {
        setExpandedCard(
            createElement('img', {
                id: 'close-modal',
                className: 'card-image b-radius-25',
                src: image_uris.normal,
                alt: `${card.name} image`,
            })
        );
    }, [])

    const deleteRef = useRef(null);
    const publishRef = useRef(null);
    const unpublishRef = useRef(null);

    const wishlistRef = useRef(null);
    const cartRef = useRef(null);

    const apiRef = useRef(null);

    const cardImageRef = useRef(null);


    const [{ open, component }, { updateState }] = useModal(card);


    const handleClick = (e) => {
        console.log(e.target.id)
        updateState(e.target.id, card, imgAttributes, ExpandedCard, (value) => handleClick(value));
    }

    return (
        <>
            {/* <DeleteCard attributes={{ ...attributes }} card={card} confirmationOverlay={confirmationOverlay} setConfirmationOverlay={(value) => setConfirmationOverlay(value)} /> */} 
            <div className="card-container">
                <Modal open={open}>
                    {component}
                </Modal>
                <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
                <section className="card-body" >
                    <CardImageSection attributes={{ ...imgAttributes, id: 'expand-card' }} handleClick={handleClick} cardImageRef={cardImageRef} />
                    <CardDetailSection card={card} searchType={searchType} loading={loading} />
                </section>
                <footer className="card-footer">
                    {searchType === 'search-catalog' ? (
                        <CatalogCardFooter card={card} ref={{ cartRef, wishlistRef }} />
                    ) :
                        searchType === 'search-collection' ? (
                            <CollectionCardFooter card={card} handleClick={handleClick} ref={{ deleteRef, publishRef, unpublishRef }} />
                        ) : (
                                <ApiCardFooter card={card} setLoading={(value) => { setLoading(value) }} ref={apiRef} />
                        )
                    }
                </footer>
            </div>
        </>
    )
}

export default Card;
