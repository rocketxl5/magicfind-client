import Container from '../../../components/Container';
import Option from '../../../components/Option';

const QuantitySelector = (props) => {
    const { id, classList = '', name, product, quantitySelected, quantityAvailable, handleChange } = props;

    return (
        product?.quantity &&
        <Container classList={classList}>
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
        </Container>
    )
}

export default QuantitySelector
