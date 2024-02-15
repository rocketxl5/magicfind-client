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
                                className: 'color-icon',
                                name: 'color-icon',
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

        const costUrls = setUrls(card.mana_cost?.split(/\{([^}]+)\}/).filter(value => value));
        const identityUrls = setUrls(card.color_identity);
        setIcons(costUrls, 'cost');
        setIcons(identityUrls, 'identity');
    }, [card])

    return { colorIdentity, manaCost }
}

export default useColorSymbols
