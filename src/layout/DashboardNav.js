import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import data from '../data/LINKS.json';
import { api } from '../api/resources';
import useFetch from '../hooks/useFetch';
import useAuth from '../hooks/contexthooks/useAuth';
import useSearch from '../hooks/contexthooks/useSearch';
import useMail from '../hooks/contexthooks/useMail';

const DashboardNav = () => {
    const {
        // archiveCardNames,
        setArchiveCardNames,
        setCollectionCardNames,
        setUpdateCollection,
        updateCollection,
        isCollectionEmpty,
        setIsCollectionEmpty,
        setCardCollection
    } = useSearch();

    const { auth } = useAuth();
    const { setMailCount } = useMail();
    const { fetchAll } = useFetch();
    const { query } = useParams();

    const links = data.dashboardLinks;

    ////////////////////////////////////// Start ////////////////////////////////////////////////
    // Fetch archive card names for autocomplete archive search                                //
    // Source @ https://stackoverflow.com/questions/72617678/how-to-do-multiple-fetch-requests //
    // Fetch unread messages from user account                                                 //
    /////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchAll([
            {
                query: `/api/cards/mtg-cardnames`,
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                setter: (value) => {
                    setArchiveCardNames(value);
                    setUpdateCollection(true);
                }
            },
            {
                query: `/api/mail/${auth.user.id}`,
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': auth.token
                    }
                },
                setter: (value) => {
                    if (value.length > 0) {
                        setMailCount(value.length)
                    }
                }
            }
        ]).catch(console.error)
    }, [])
    /* ///////////////////////////// End ////////////////////////////// */


    //////////////////////////////// Start ///////////////////////////////
    // Setting collection card names for autocomplete collection search //
    //////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (updateCollection) {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);
            headers.append('query', 'ids')
            const options = {
                method: 'GET',
                headers: headers,
            }

            fetch(`${api.serverURL}/api/cards/collection/${auth.user.id}`, options)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                            .then((data) => {
                                const ids = data.card.ids;
                                const names = data.card.names;
                                if (ids.length === 0 && names.length === 0) {
                                    setIsCollectionEmpty(true);
                                }
                                else {
                                    setCollectionCardNames(data.card.names);
                                    setCardCollection(data.card.ids);
                                    isCollectionEmpty && setIsCollectionEmpty(false)
                                }
                                setUpdateCollection(false)
                            })
                    }
                    else if (res.status === 400) {
                        return res.json()
                            .then((error) => {
                                console.log(error.message)
                            })
                    }
                    else if (res.status === 500) {
                        return res.json()
                            .then((error) => {
                                console.log(error.message)
                            })
                    }
                }
                )
                .catch((error) => {
                    console.log(error.message)
                });
        }
    }, [updateCollection])
    /* ////////////////////////////// End /////////////////////////// */


    return (
        <section className="dashboard-nav">
            <div className="contextual-links">
                {links.map((link, i) => {
                    return (
                        <NavLink
                            key={i}
                            id={link.id}
                            to={`/me/${link.id}`}
                            className={({ isActive }) => {
                                // If search param is defined, add active class else add inactive class 
                                return (isActive && !query) ? 'active' : 'inactive'
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
