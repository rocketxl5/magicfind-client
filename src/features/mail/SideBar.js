import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import getPath from '../../assets/utilities/getPath'
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import data from '../../data/LINKS.json';

const SideBar = ({
  isTrash,
  checkedState,
  setMessages,
  setLoading,
  messages,
  user,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, setPathname } = useContext(PathContext);

  const links = data.mailLinks
  // Set path on location change
  useEffect(() => {

    if (pathname !== getPath(location.pathname)) {
      localStorage.removeItem('message');
    }
    setPathname(getPath(location.pathname));
  }, [location]);

  // Update isTrash status in database for checked messages
  const handleTrashClick = (e) => {
    const trashed = [];
    // Populate messages selected for the trash bin (state: true === checked message)
    if (localStorage.getItem('message')) {
      trashed.push(JSON.parse(localStorage.getItem('message')));
    } else {
      // Populate messages selected for the trash bin (state: true === checked message)
      checkedState.forEach((state, index) => {
        if (state) {
          trashed.push(messages[index]);
        }
      });
    }

    setLoading(true);

    const updates = {
      userID: user.id,
      trashed: trashed,
      pathname: pathname,
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', user.token);

    const options = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(updates),
    };

    fetch(`${api.serverURL}/api/mail/`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        localStorage.removeItem('message');
        setMessages(data.data);
        setPathname(getPath(location.pathname));
        navigate(`/me/mail/${pathname}`);
      });
  };

  // On click of delete button. Triggered on checkbox select in Trash Bin view
  const handleDeleteClick = () => {
    const deleted = [];

    // Populate messages selected for the trash bin (state: true === checked message)
    checkedState.forEach((state, index) => {
      if (state) {
        deleted.push(messages[index]);
      }
    });

    const updates = {
      userID: user.id,
      toBeDeleted: deleted,
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', user.token);

    const options = {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(updates),
    };

    fetch(`${api.serverURL}/api/mail/delete`, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        localStorage.removeItem('message');
        setMessages(data.data.length > 0 ? data.data : []);
        setPathname(getPath(location.pathname));
        navigate(`/me/mail/${pathname}`);
      });
  };

  return (
    <div className="col-12 bg-surface ">

        <div className="mailbox-sidebar-header">
          <button
            className="compose-message"
            type="button"
            onClick={() => {
              setPathname('message');
              navigate('/me/mail/message');
            }}
          >
          New Message
          </button>
          {isTrash && location.pathname.includes('trash') ? (
            <button className="remove-message" type="button" onClick={handleDeleteClick}>
              Delete
            </button>
          ) : isTrash ? (
              <button className="remove-message" type="button" onClick={handleTrashClick}>
              Trash
            </button>
          ) : (
            ''
          )}
      </div>

      <ul className="mailbox-sidebar-options">
        {
          links.map((link, i) => {
            return (
              <ListItem>
                <NavLink
                  key={i + 1}
                  id={link.id}
                  to={`/me/mail/${link.id}`}
                  className={({ isActive }) => {
                    // If search param is defined, add active class else add inactive class 
                    return (isActive) ? 'active' : 'inactive'
                  }}
                >
                  <span >{link.title}</span>
                </NavLink>
              </ListItem>
            )
          })
        }
      </ul>
    </div>
  );
};

const TrashIcon = styled.span`
  display: block;
  margin-left: 10px;
`;

const SideMenu = styled.aside`
  width: 98%;
  padding: 10px;
  border: 1px solid #f5f8fa;
`;

const List = styled.ul`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ListItem = styled.li`
  a {
    display: block;
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #fff;
  }
  a:hover {
    background: #f5f8fa;
    border: 1px solid #f1f9ff;
  }
`;

const Compose = styled.button`
  text-align: center;
  width: 100%;
  padding: 10px 0;
  background: #28a745;
  color: #fff;
  font-size: 1rem;
  border: 2px solid #28a745;
`;

export default SideBar;
