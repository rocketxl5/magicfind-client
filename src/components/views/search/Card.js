import { useState, useEffect, createElement } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
import Modal from './Modal';
import card_back from '../../../assets/img/card_back.jpg'
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';
// Modal custom hook
import useModal from '../../../hooks/useModal';

const Card = (props) => {
    const { card, searchType } = props;
    const [loading, setLoading] = useState(false);
    const [ExpandedCard, setExpandedCard] = useState(null);

    const image_uris = card?.image_uris || card?.card_faces[0].image_uris;
    const imgAttributes = {
        id: 'expand-card',
        style: 'card-image b-radius-10',
        src: image_uris.small,
        alt: `${card.name} image`,
        placeholder: card_back
    }

    // Create expanded image component
    // card state passed in dependency array
    // to update images from location (navigate) state @ DeletedCard  & SearchComponents
    useEffect(() => {
        setExpandedCard(
            createElement('img', {
                id: 'reduce-card',
                className: 'card-image b-radius-20',
                src: image_uris.normal,
                alt: `${card.name} image`,
            })
        );
    }, [card])

    const [{ open, component }, { updateState }] = useModal(card);

    // useEffect(() => {
    //     if (open) {
    //         document.body.style.overflowY = 'hidden';
    //     } else {
    //         document.body.style.overflowY = 'scroll';
    //     }
    // }, [open])

    const handleClick = (e) => {
        e.stopPropagation();
        updateState(e.target.id, imgAttributes, ExpandedCard, (value) => handleClick(value));
    }

    return (
        <>
            {/* <DeleteCard attributes={{ ...attributes }} card={card} confirmationOverlay={confirmationOverlay} setConfirmationOverlay={(value) => setConfirmationOverlay(value)} /> */} 
            <div className="card-content">
                <Modal open={open}>
                    {component}
                </Modal>
                <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
                <section className="card-body" >
                    <CardImageSection attributes={imgAttributes} handleClick={handleClick} />
                    <CardDetailSection card={card} searchType={searchType} loading={loading} />
                </section>
                <footer className="card-footer">
                    {searchType === 'search-catalog' ? (
                        <CatalogCardFooter card={card} />
                    ) :
                        searchType === 'search-collection' ? (
                            <CollectionCardFooter card={card} handleClick={handleClick} />
                        ) : (
                                <ApiCardFooter card={card} setLoading={(value) => { setLoading(value) }} />
                        )
                    }
                </footer>
            </div>
        </>
    )
}

export default Card;
