import Container from './Container';

const Card = ({ children, classList }) => {
    return (
        <Container classList={`card ${classList}`}>
            {children}
        </Container>
    )
}

export default Card
