// Source @ https://www.youtube.com/watch?v=zy8rqihtvA8

import { Link, useLocation } from 'react-router-dom';
import capitalizeString from '../../assets/utilities/capitalizeString';

const Breadcrumbs = () => {
    const location = useLocation();

    let currentLink = '';
    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
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
            {crumbs}
        </div>
    )
}

export default Breadcrumbs
