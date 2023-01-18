import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { SearchContext } from './SearchContext';
import { PathContext } from './PathContext';
export const CardContext = createContext(null);
// Prevents access to add-card component if a card  hasen't been selected
// previously. This means a search has been done in the search-api view
// and a card was selected to be added to the user store
export const CardProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { isValidLength } = useContext(SearchContext);
  const { path } = useContext(PathContext);
  const [cardContext, setCardContext] = useState(false);
  const [apiCardNames, setApiCardNames] = useState([]);
  // tracker following currentListItem index
  const [tracker, setTracker] = useState(0);
  const [userStoreContent, setUserStoreContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (true) {
      // setLoading(true);

      const headers = { method: 'GET' };
      fetch(`https://api.scryfall.com/catalog/card-names`, headers)
        .then((res) => res.json())
        .then((data) => {
          setApiCardNames(data.data);
          // setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (user && path === 'store') {
      const token = user.token;
      const id = user.id;

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('auth-token', token);
      const options = {
        method: 'GET',
        headers: headers
      };
      fetch(`/api/cards/${id}`, options)
        .then((res) => res.json())
        .then((data) => {
          setUserStoreContent(data.data);
          // setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [path]);

  return (
    <CardContext.Provider
      value={{
        cardContext,
        setCardContext,
        apiCardNames,
        setApiCardNames,
        userStoreContent,
        setUserStoreContent,
        loading,
        setLoading,
        tracker,
        setTracker
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
