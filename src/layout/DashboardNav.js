import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import useAuth from '../hooks/contexthooks/useAuth';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/contexthooks/useSearch';
import useMail from '../hooks/contexthooks/useMail';
import { api } from '../api/resources';
import data from '../data/LINKS.json';

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
    const { fetchAll, fetch, error, response } = useFetch();
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
                query: `/api/cards/cardnames`,
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                setter: (data) => {
                    setArchiveCardNames(data);
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
                setter: (data) => {
                    if (data.length > 0) {
                        setMailCount(data.length)
                    }
                }
            }
        ], api.serverURL).catch(console.error)
    }, [])
    /* ///////////////////////////// End ////////////////////////////// */


    //////////////////////////////// Start ///////////////////////////////
    // Setting collection card names for autocomplete collection search //
    //////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (updateCollection) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth.token,
                },
            };
            const url = `${api.serverURL}/api/users/collection/${auth.user.id}`;
            fetch(url, config);
        }
        // if (updateCollection) {
        //     const headers = new Headers();
        //     headers.append('Content-Type', 'application/json');
        //     headers.append('auth-token', auth.token);
        //     headers.append('query', 'ids')
        //     const options = {
        //         method: 'GET',
        //         headers: headers,
        //     }

        //     fetch(`${api.serverURL}/api/cards/collection/${auth.user.id}`, options)
        //         .then(res => {
        //             if (res.ok) {
        //                 return res.json()
        //                     .then((data) => {
        //                         const { ids, names } = data.card
        //                         if (ids.length === 0 && names.length === 0) {
        //                             setIsCollectionEmpty(true);
        //                         }
        //                         else {
        //                             setCollectionCardNames(names);
        //                             setCardCollection(ids);
        //                             isCollectionEmpty && setIsCollectionEmpty(false)
        //                         }
        //                         setUpdateCollection(false)
        //                     })
        //             }
        //             else if (res.status === 400) {
        //                 return res.json()
        //                     .then((error) => {
        //                         console.log(error.message)
        //                     })
        //             }
        //             else if (res.status === 500) {
        //                 return res.json()
        //                     .then((error) => {
        //                         console.log(error.message)
        //                     })
        //             }
        //         }
        //         )
        //         .catch((error) => {
        //             console.log(error.message)
        //         });
        // }
    }, [updateCollection])

    useEffect(() => {
        if (response) {
            // console.log(response)
            const { ids, names } = response.card;
            if (ids.length === 0 && names.length === 0) {
                setIsCollectionEmpty(true);
            }
            else {
                setCollectionCardNames(names);
                setCardCollection(ids);
                isCollectionEmpty && setIsCollectionEmpty(false)
            }
            setUpdateCollection(false)
        }
    }, [response])
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
