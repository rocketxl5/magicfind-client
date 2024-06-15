import Print from './Print';
import useSearchContext from '../../../hooks/contexthooks/useSearchContext';

const Set = ({ id, prints }) => {

    const { cardSets } = useSearchContext();

    return (
        <>
            {cardSets && 
                <div className="set">
                    <div className="set-header">
                        <h2>
                            <span
                                className='set-icon'
                                style={{ maskImage: `url(${cardSets[id]?.icon_svg_uri})`, WebkitMaskImage: `url(${cardSets[id]?.icon_svg_uri})` }}
                            >
                            </span>
                            <span className='set-name'>{cardSets[id]?.name}</span>
                        </h2>
                    </div>
                    <div className='set-prints'>
                        {
                            prints.map((print, i) => {
                                return <Print key={i} print={print} />
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Set
