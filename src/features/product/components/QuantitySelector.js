import Container from '../../../components/Container';
import Option from '../../../components/Option';

const QuantitySelector = (props) => {
    const { classList = '', name, product, quantitySelected, quantityAvailable, handleChange } = props;

    return (
        product?.quantity &&
        <Container classList={classList}>
            <select
                name={name}
                value={quantitySelected}
                    onChange={(e) => handleChange(parseInt(e.target.value))}
            >
                {quantityAvailable && [...Array(quantityAvailable + 1).keys()].map((key) => {
                    return (
                        <Option key={key} value={key}>
                            {key}
                        </Option>
                    )
                })}
            </select>
        </Container>
    )
}

export default QuantitySelector
