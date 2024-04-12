import { useState, useEffect, createElement } from 'react'

const useColorSymbols = (card) => {
    const [colorIdentity, setColorIdentity] = useState([]);
    const [manaCost, setManaCost] = useState([]);

    useEffect(() => {
        const setUrls = (symbols) => {
            if (symbols?.length) {
                return symbols.map(symbol => `https://svgs.scryfall.io/card-symbols/${symbol}.svg`);
            }
        }

        const setIcons = (urls, type) => {
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
                        if (type === 'cost') {
                            setManaCost(imgs)
                        }
                        else if (type === 'identity') {
                            setColorIdentity(imgs)
                        }
                    }
                })
                .catch(error => console.log('Imgage load has failded'));
        }

        // Set manaCost with mana_cost property value
        // @reversible cards: mana_cost property is @ card_faces array
        const manaCost = card.mana_cost ? card.mana_cost : card.card_faces[0].mana_cost;
        const costUrls = setUrls(manaCost.split(/\{([^}]+)\}/).filter(value => value));
        const identityUrls = setUrls(card.color_identity);
        setIcons(costUrls, 'cost');
        setIcons(identityUrls, 'identity');
    }, [card])

    return { colorIdentity, manaCost }
}

export default useColorSymbols
