// Source @ https://www.youtube.com/watch?v=zy8rqihtvA8

import { Link, useLocation, useParams } from 'react-router-dom'

const Breadcrumbs = () => {
    const location = useLocation();
    const { id } = useParams();
    console.log(id)
    console.log(location)
    let currentLink = '';
    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            console.log(crumb)
            currentLink += `/${crumb}`;
            console.log(currentLink)
            return (
                <span className="crumb" key={crumb}>
                    {/* Replace root prefix  of path to home */}
                    <Link to={currentLink}>{crumb === 'me' ? 'home' : crumb}</Link>
                </span>
            )

        })
    // console.log(currentLink)

    return (
        <div className="breadcrumbs">
            {crumbs}
        </div>
    )
}

export default Breadcrumbs
