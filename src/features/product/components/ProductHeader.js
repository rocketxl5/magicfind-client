import Header from '../../../components/Header';

const ProductHeader = ({ children, classList }) => {
    return (
        <Header classList={classList}>
            {children}
        </Header>
    )
}

export default ProductHeader
