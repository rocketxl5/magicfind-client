import Container from '../../../components/Container'

const ProductActions = ({ children, classList }) => {
    return (
        <Container classList={classList}>
            {children}
        </Container>
    )
}

export default ProductActions
