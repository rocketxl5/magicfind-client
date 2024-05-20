import Option from '../../../components/Option';

const QuantitySelector = (props) => {
    const { id, classList = '', name, product, quantitySelected, quantityAvailable, handleChange } = props;

    return (
        product?.quantity &&
        <div className={classList}>
            <select
                    id={id}
                    name={name}
                    value={quantitySelected}
                    onChange={(e) => handleChange(parseInt(e.target.value))}
            >
                {quantityAvailable && [...Array(quantityAvailable + 1).keys()].map((key) => {
                    return (
                        <Option key={parseInt(key + 2)} value={key}>
                            {key}
                        </Option>
                    )
                })}
            </select>
            </div>
    )
}

export default QuantitySelector
