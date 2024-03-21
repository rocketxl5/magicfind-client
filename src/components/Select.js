import Container from './Container.js';
import Option from './Option';

const Select = (props) => {
  const { classList = '', name, product, quantitySelected, quantityAvailable, handleChange } = props;

  return (
    product?.quantity &&
    <Container classList={classList}>
    <select
          id="quantity"
          name={name}
          value={quantitySelected}
          onChange={(e) => handleChange(e)}
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
export default Select