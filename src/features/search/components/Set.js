import { useEffect, useState } from 'react';
import Print from './Print';
import useImageLoader from '../../../hooks/useImageLoader';
import useSearch from '../../../hooks/contexthooks/useSearch'

const Set = ({ set }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { cardSets } = useSearch();

    console.log(cardSets[set.id])

    const [imagesLoaded] = useImageLoader(set.prints);

    return (
        <div className="set">
            <div className="set-header">
                <h2>
                    {
                        // imagesLoaded &&
                        <span className='set-icon' style={{ maskImage: `url(${cardSets[set.id]?.icon_svg_uri})`, WebkitMaskImage: `url(${cardSets[set.id]?.icon_svg_uri})` }}>

                            {/* <img className='icon' src={`${cardSets[set.set]?.icon_svg_uri}`} style={{ fill: 'red' }} onload='SVGInject(this)' alt='Set icon' /> */}
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
