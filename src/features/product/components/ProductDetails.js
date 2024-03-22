import Container from '../../../components/Container'

const ProductDetails = ({ children, classList }) => {
    return (
        <Container classList={classList}>
            <Container classList={'flex flex-column'}>
                {children}
            </Container>
        </Container>
    )
}

export default ProductDetails
