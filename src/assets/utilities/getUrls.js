const getCardImgUrls = (cards) => {
    const result = []

    cards.forEach(card => {
        if (card.image_uris) {
            result.push(card.image_uris?.normal)
        }
        else if (card.card_faces) {
            card.card_faces.forEach(card_face => {
                result.push(card_face.image_uris?.normal)
            })
        }
    })

    return result
}

export default getCardImgUrls