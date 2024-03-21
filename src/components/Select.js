import Container from './Container.js';
import Option from './Option';

const Select = (props) => {

  // Props
    const { classList = '', name, product, quantitySelected, quantityAvailable, handleChange } = props;

    //   useEffect(() => {
    //     const index = isIndex();
    //     let items;

    //     // If quantity selected is greater than zero
    //       if (value > 0) {
    //           let item

    //         // If item quantity selected is available
    //           if (item?.isAvailable) {

    //           // If cart is not empty
    //           if (cartItems?.length > 0) {
    //             items = [...cartItems];

    //             // If item selected is already in cart
    //             if (index !== false) {
    //               items[index].quantity = value;
    //             }
    //             // Item selected is not in cart
    //             else {
    //               // Add selected quantity item to cart
    //               items = [...cartItems, { selected: product, quantity: value }];
    //             }
    //             setCartItems(items);
    //           }
    //           // Cart is empty [Catalog card only not cart] 
    //           
    //           else {

    //             setCartItems([{ selected: product, quantity: value }])
    //           }
    //           // Update cart
    //           // Update select element value
    //               //   setQuantitySelected(value);
    //         }
    //         else {
    //           console.log('Selected item quantities have changed')
    //         }
    //           //   })();
    //     }
    //     // If quantity selected is zero
    //     else if (value === 0) {
    //       // Set select value
    //           //   setQuantitySelected(0);
    //       // If item selected is in cart
    //       if (index !== false) {
    //         // Clone cart
    //         items = [...cartItems];
    //         // Remove selected item from clone
    //         items.splice(index, 1);
    //         // Update cart
    //         setCartItems(items);
    //       }
    //     }
    //   }, [value])

    // Passing product to depedency array
    // Triggers each time product searched changes
    //   useEffect(() => {
    //     // If cart id defined but empty
    //     if (cartItems?.length === 0) {
    //         //   return setQuantitySelected(0);
    //     }

    //     if (location.pathname.includes('shopping-cart')) {
    //         //   setQuantitySelected(quantity)
    //     }
    //     else if (location.pathname.includes('catalog')) {

    //       const index = isIndex();
    //       // If item in cart
    //       if (index !== false) {
    //           // setQuantitySelected(cartItems[index].quantity);
    //       }
    //     }

    //   }, [product, cartItems, isIndex])


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