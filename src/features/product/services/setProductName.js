export const setProductName = (product) => {
    const sides = product.name.split('//').map(side => {
        return side.trim();
    })
    // Assign only one of the value to card.name if equal
    if (sides[0] === sides[1]) {
        product.name = sides[0];
    }

    return product;
}