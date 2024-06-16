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

    const crumbs = path.split('/').filter(name => name !== '')

    let currentCrumb = ''

    const breadcrumbs = crumbs.map((crumb, i) => {
        currentCrumb += `/${crumb}`;
            return (
                <span className="crumb" key={crumb}>
                    {
                        i < crumbs.length - 1 ?
                            <Link to={currentCrumb}>{crumb === 'me' ? 'Dashboard' : capitalizeString(crumb, true)}</Link> :
                            // If last crumb, exclude from link
                            capitalizeString(crumbs[i], true)
                    }
                </span>
            )
        })

    return (
        <div className="breadcrumbs">
            <div className="crumbs">
                {breadcrumbs}
            </div>
        </div>
    )
}

export default Breadcrumbs
