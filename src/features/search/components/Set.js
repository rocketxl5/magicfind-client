import { useEffect, useState } from 'react';
import Print from './Print';
import useImageLoader from '../../../hooks/useImageLoader';
import useSearch from '../../../hooks/contexthooks/useSearch'

const Set = ({ set }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { cardSets } = useSearch();

    // console.log(cardSets[set.id])

    // const [imagesLoaded] = useImageLoader(set.prints);

    // useEffect(() => {
    //     if (imagesLoaded.length > 0) {
    //         console.log(imagesLoaded)
    //     }
    // })

    return (
        <div className="set">
            <div className="set-header">
                <h2>
                    {
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
