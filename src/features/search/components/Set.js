import { useEffect, useState } from 'react';
import Print from './Print';
import useImageLoader from '../../../hooks/useImageLoader';
import useSearch from '../../../hooks/contexthooks/useSearch'

const Set = ({ collection }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { cardSets } = useSearch();

    console.log(cardSets[collection.id])

    const [imagesLoaded] = useImageLoader(collection.prints);

    return (
        <div className="set">
            <div className="set-header">
                <h2>
                    {
                        imagesLoaded &&
                        <span className='set-icon' style={{ maskImage: `url(${cardSets[collection.id]?.icon_svg_uri})`, WebkitMaskImage: `url(${cardSets[collection.id]?.icon_svg_uri})` }}>

                            {/* <img className='icon' src={`${cardSets[collection.set]?.icon_svg_uri}`} style={{ fill: 'red' }} onload='SVGInject(this)' alt='Set icon' /> */}
                    </span>
                    }
                    <span className='set-name'>{cardSets[collection.id]?.name}</span>
                </h2>
            </div>
            <div className='set-prints'>
                {
                    collection?.prints.map((print, i) => {
                        return <Print key={i} print={print} />
                    })
                }
            </div>
        </div>
    )
}

export default Set
