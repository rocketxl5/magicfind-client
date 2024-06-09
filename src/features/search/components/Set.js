import { useEffect } from 'react';
import Print from './Print';
import useImageLoader from '../../../hooks/useImageLoader';
import useSearch from '../../../hooks/contexthooks/useSearch'
const Set = ({ set }) => {

    const { cardSets } = useSearch();

    const { imagesLoaded, setUris } = useImageLoader(set.prints); 

    useEffect(() => {
        const uris = set.prints.map(print => print.image_uris ? print.image_uris.normal : print.card_face.image_uris.normal)
        setUris(uris)
    }, [])

    return (
        <div className="set">
            <div className="set-header">
                <h2>
                    {
                        imagesLoaded &&
                        <span className='set-icon' style={{ maskImage: `url(${cardSets[set.id]?.icon_svg_uri})`, WebkitMaskImage: `url(${cardSets[set.id]?.icon_svg_uri})` }}>
                        </span>
                    }
                    <span className='set-name'>{cardSets[set.id]?.name}</span>
                </h2>
            </div>
            <div className='set-prints'>
                {
                    set?.prints.map((print, i) => {
                        return <Print key={i} print={print} />
                    })
                }
            </div>
        </div>
    )
}

export default Set
