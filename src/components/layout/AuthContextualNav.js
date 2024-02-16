import { useEffect, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext';
import useAuth from '../../hooks/useAuth';
import { api } from '../../api/resources';

const AuthContextualNav = ({ views }) => {
    const {
        archiveCardNames,
        setArchiveCardNames,
        setCollectionCardNames,
        updateCollection
    } = useContext(SearchContext);

    const { auth } = useAuth();
    const { query } = useParams();

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
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [])


    // Setting collection card names for autocomplete collection search
    useEffect(() => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth-token', auth.token);
        const options = {
            method: 'GET',
            headers: headers,
        }

        fetch(`${api.serverURL}/api/cards/${auth.id}/cardnames`, options)
            .then(res => res.json())
            .then((data) => {
                setCollectionCardNames(data);
            })
            .catch((error) => {
                console.log(error)
            });

    }, [updateCollection])

    return (
        <section className="contextual-nav">
        <div className="contextual-links">
                {views.map((view, index) => {
                return (
                    <NavLink
                        key={index}
                        id={view.id}
                        to={`/me/${view.id}`}                        
                        className={({ isActive }) => {
                            // If search param is defined, add active class else add inactive class 
                            return isActive && !query ? 'active-link' : 'inactive-link'
                        }}
                    >
                        <span >{view.title}</span>
                    </NavLink>
                )
            })}
        </div>
        </section>
    )
}

export default AuthContextualNav
