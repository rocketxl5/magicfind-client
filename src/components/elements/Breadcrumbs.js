// Source @ https://www.youtube.com/watch?v=zy8rqihtvA8

import { Link, useLocation } from 'react-router-dom';
import capitalizeString from '../../assets/utilities/capitalizeString';

const Breadcrumbs = () => {
    const location = useLocation();
    const path = location.pathname;

    if (path.includes('catalog') || path === '/') {
        return null
    }

    let currentLink = ''

    const crumbs = path.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            console.log(currentLink)
            currentLink += `/${crumb}`;
            return (
                <span className="crumb" key={crumb}>
                    {/* Replace root prefix  of path to home */}
                    <Link to={currentLink}>{crumb === 'me' ? 'Home' : capitalizeString(crumb, true)}</Link>
                </span>
            )

        })

    return (
        <div className="breadcrumbs">
            <div className="crumbs">
            {crumbs}
            </div>
        </div>
    )
}

export default Breadcrumbs
