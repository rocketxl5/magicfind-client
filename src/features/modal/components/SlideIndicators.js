import Indicator from './Indicator';

const SlideIndicators = (props) => {
    const { items, ...rest } = props
    return (
        <div id='indicators' className="indicators">
            {
                [...Array(items).keys()].map((key) => {
                    return <Indicator key={key} index={key} {...rest} />
                })
            }
        </div>
    )
}

export default SlideIndicators
