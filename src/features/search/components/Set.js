import { useEffect } from 'react';
import Print from './Print';
// import useLoadImages from '../../../hooks/useLoadImages';
import useSearchContext from '../../../hooks/contexthooks/useSearchContext';
import useModal from '../../../hooks/useModal';

const Set = ({ set }) => {

    const { cardSets } = useSearchContext();

    const { handleModalImageUris } = useModal();

    useEffect(() => {
        handleModalImageUris(set.prints.map(print => print?.image_uris ? print?.image_uris.normal : print?.card_faces[0].image_uris.normal))
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
                            set?.prints.map((print, i) => {
                                return <Print key={i} index={i} print={print} />
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Set
