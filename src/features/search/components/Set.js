import { useEffect } from 'react';
import Print from './Print';
import useImageLoader from '../../../hooks/useImageLoader';
import useSearch from '../../../hooks/contexthooks/useSearch'
const Set = ({ set }) => {

    const { cardSets } = useSearch();

    const { setUris, images } = useImageLoader(); 

    useEffect(() => {
        setUris(set.prints.map(print => print?.image_uris ? print?.image_uris.normal : print?.card_faces[0].image_uris.normal))
    }, []);

    return (
        <>
            {cardSets && 
                <div className="set">
                    <div className="set-header">
                        <h2>
                            <span
                                className='set-icon'
                                style={{ maskImage: `url(${cardSets[set.id]?.icon_svg_uri})`, WebkitMaskImage: `url(${cardSets[set.id]?.icon_svg_uri})` }}
                            >
                            </span>
                            <span className='set-name'>{cardSets[set.id]?.name}</span>
                        </h2>
                    </div>
                    <div className='set-prints'>
                        {
                            images &&
                            set?.prints.map((print, i) => {
                                return <Print key={i} print={print} ModalImage={() => <img {...images[i].props} alt={images[i].props.alt} />} />
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Set
