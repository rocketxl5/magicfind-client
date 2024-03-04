import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import data from '../data/AUTH.json';
import { api } from '../api/resources';
import useAuth from '../hooks/useAuth';
import useSearch from '../hooks/useSearch';

const DashboardNav = () => {
    const {
        archiveCardNames,
        setArchiveCardNames,
        setCollectionCardNames,
        setUpdateCollection,
        updateCollection
    } = useSearch();

    const { auth } = useAuth();
    const { query } = useParams();

    const { links } = data;
    // Setting archive card names for autocomplete archive search
    useEffect(() => {
        if (!archiveCardNames) {

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const options = {
                method: 'GET',
                headers: headers,
            };

            fetch(`${api.serverURL}/api/cards/mtg-cardnames`, options)
                .then((res) => res.json())
                .then((data) => {
                    setArchiveCardNames(data);
                    setUpdateCollection(true);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [])


    // Setting collection card names for autocomplete collection search
    useEffect(() => {
        // If true
        if (updateCollection) {

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);
            const options = {
                method: 'GET',
                headers: headers,
            }

            fetch(`${api.serverURL}/api/cards/${auth.user.id}/cardnames`, options)
                .then(res => res.json())
                .then((data) => {
                    setCollectionCardNames(data);
                    // Reinitialize updateCollection to allow updates
                    setUpdateCollection(false);
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }, [updateCollection])

    return (
        <section className="dashboard-nav">
            <div className="contextual-links">
                {links.map((link, index) => {
                    return (
                        <NavLink
                            key={index}
                            id={link.id}
                            to={`/me/${link.id}`}
                            className={({ isActive }) => {
                                // If search param is defined, add active class else add inactive class 
                                return isActive && !query ? 'active' : 'inactive'
                            }}
                        >
                            <span >{link.title}</span>
                        </NavLink>
                    )
                })}
            </div>
        </section>
    )
}

export default DashboardNav
