import { sanitizeName } from './sanitizeName';

export const trimProduct = (params) => {
    const { type, product } = params;

    const product_types = {
        card: (product) => {
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
                // set_type,
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

            // Return trimmed product object with sanitized name 
            return {
                ...trimmedProduct,
                name: sanitizeName(trimmedProduct.name)
            }
        },
        user: (product) => {
            // Remove unecessary properties
            const {
                artist_ids,
                border_color,
                catalog,
                finishes,
                foil,
                frame,
                _id,
                legalities,
                oracle_id,
                owners,
                prints_search_uri,
                related_uris,
                // set_id,
                ...trimmedProduct
            } = product;

            // Add inStore, inDeck, decks, inventory properties and return
            return {
                ...trimmedProduct,
                inStore: false,
                inDeck: false,
                decks: [],
                store: [],
                ref: product._id
            }
        }
    }
    return product_types[type](product)
}
