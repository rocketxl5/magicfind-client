import setProductName from './setProductName';

const trimProduct = (product, type) => {
    const product_types = {
        cards: (product) => {
            const {
                arena_id,
                booster,
                card_back_id,
                cardmarket_id,
                digital,
                flavor_text,
                frame_effects,
                full_art,
                games,
                highres_image,
                illustration_id,
                image_status,
                layout,
                multiverse_ids,
                mtgo_foil_id,
                mtgo_id,
                nonfoil,
                object,
                printed_name,
                printed_text,
                printed_type_line,
                produced_mana,
                promo,
                promo_types,
                purchase_uris,
                reprint,
                reserved,
                rulings_uri,
                scryfall_set_uri,
                scryfall_uri,
                security_stamp,
                set_search_uri,
                set_type,
                set_uri,
                story_spotlight,
                tcgplayer_etched_id,
                tcgplayer_id,
                textless,
                uri,
                variation,
                watermark,
                ...trimmedProduct
            } = product;

            // Remove produt name repetition if any
            return !trimmedProduct.name.includes('//') ? trimmedProduct : setProductName(trimmedProduct);
        },
        users: (product) => {
            // Remove unecessary properties
            let {
                artist_ids,
                border_color,
                frame,
                legalities,
                oracle_id,
                prints_search_uri,
                related_uris,
                set_id,
                owners,
                catalog,
                ...trimmedProduct
            } = product;

            // Add inStore, inDeck, decks, inventory properties and return
            return {
                ...trimmedProduct,
                inStore: false,
                inDeck: false,
                decks: [],
                inventory: [],
                ref: product._id
            }
        }
    }
    return product_types[type](product, type)
}

export default trimProduct
