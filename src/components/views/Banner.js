import { Link } from 'react-router-dom'
const Banner = ({ classList, title, link }) => {
    return (
        <section className='banner-section'>
            <div className={classList}>
                <Link className="banner-link" to={link}>
                    {title}
                </Link>
            </div>
        </section>
    )
}

export default Banner
