import { useState, useEffect, createElement } from 'react'

const useColorSymbols = (card) => {
    const [colorIdentity, setColorIdentity] = useState([]);
    const [manaCost, setManaCost] = useState([]);
    const [cardCost, setCardCost] = useState(null);
    const [cardColor, setCardColor] = useState(null);

    const setUrls = (symbols) => {
        if (symbols?.length) {
            return symbols.map(symbol => `https://svgs.scryfall.io/card-symbols/${symbol}.svg`);
        }
    }

    const setIcons = async (urls, type) => {

        const loadImage = (url) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;
                image.onload = () => resolve(url);
                image.onerror = error => reject(error);
            })
        }

        Promise.all(urls?.map((url, i) => loadImage(url, i)))
            .then(data => {
                if (data) {
                    const imgs = data.map((url, i) => {
                        return createElement('img', {
                            key: i,
                            className: 'color-symbol',
                            name: 'color-symbol',
                            src: url,
                            alt: 'Color Icon'
                        })
                    })
                    if (imgs) {
                        if (type === 'cost') setManaCost(imgs)
                        else setColorIdentity(imgs)
                    }
                }
            })
            .catch(error => console.log('Imgage load has failded'));
    }

    useEffect(() => {
        if (cardCost) {
            const urls = setUrls(cardCost.split(/\{([^}]+)\}/).filter(value => value));
            const images = setIcons(urls, 'cost');
            if (images) {
                setManaCost(images);
            }
        }
    }, [cardCost]);

    useEffect(() => {
        if (cardColor) {
            const urls = setUrls(card.color_identity);
            const images = setIcons(urls, 'identity');
            if (images) {
                setColorIdentity(images);
            }
        }
    }, [cardColor]);

    useEffect(() => {
        if (card) {
            const cost = card.mana_cost ? card.mana_cost : card.card_faces ? card.card_faces[0]?.mana_cost : null;
            const color = card.color_identity ? card.color_identity : null;
            if (cost) setCardCost(cost);
            if (color) setCardColor(color);
        }
    }, [card])

    return { colorIdentity, manaCost }
}

export default useColorSymbols
