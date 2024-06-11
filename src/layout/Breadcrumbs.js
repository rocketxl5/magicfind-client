// Source @ https://www.youtube.com/watch?v=zy8rqihtvA8

import { Link, useLocation } from 'react-router-dom';
import capitalizeString from '../assets/utilities/capitalizeString';

const Breadcrumbs = () => {
    const location = useLocation();
    const path = decodeURI(location.pathname);
    ////////////////////////////////////////
    // Exclude breadcrumbs 
    // @ catalog search results / 
    // @ 404
    // @ home page
    ////////////////////////////////////////
    if (
        path.includes('catalog') ||
        path.includes('not-found') ||
        path.includes('checkout') ||
        path.includes('shopping-cart') ||
        path.includes('product') ||
        path === '/') {
        return null
    }

    let currentLink = ''

    const crumbs = path.split('/')
        .filter(crumb => {
            return crumb !== ''
        })
        .map((crumb, i) => {
            currentLink += `/${crumb}`;
            return (
                <span className="crumb" key={crumb}>
                    {/* Replace root prefix  of path to home */}
                    <Link to={currentLink}>{crumb === 'me' ? 'Dashboard' : capitalizeString(crumb, true)}</Link>
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
