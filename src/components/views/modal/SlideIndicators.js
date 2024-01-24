import Indicator from './Indicator';

const SlideIndicators = ({ items, currentIndicator }) => {

    return (
        <div className="indicators">
            {
                [...Array(items).keys()].map((key) => {
                    return <Indicator key={key} index={key} currentIndicator={currentIndicator} />
                })
            }
        </div>
    )
}

export default SlideIndicators
