import Container from '../components/Container'

const Banner = ({ children, classList = '' }) => {

    return (
        <section className='banner'>
            <Container classList={classList}>
                {children}
            </Container>
        </section>
    )
}

export default Banner
