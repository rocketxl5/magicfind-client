import Container from '../../../components/Container';

const ProductImage = ({ children, classList }) => {

    return (
        <Container classList={classList} >
            {children}
        </Container>
    )
}

export default ProductImage
