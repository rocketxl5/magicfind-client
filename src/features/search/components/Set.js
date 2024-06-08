import Print from './Print';
import useSearch from '../../../hooks/contexthooks/useSearch'

const Set = ({ collection }) => {
    const { cardSets } = useSearch();
    const prints = collection.prints;
    return (
        <div className="set">
            <div className="set-header">
                <h2 className='set'>
                    <span className='set-icon'>
                        <img src={cardSets[collection.set]?.icon_svg_uri} alt='Set icon' />
                    </span>
                    <span>{cardSets[collection.set]?.name}</span>
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
    )
}

export default Set
