import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import getPath from '../../utilities/getPath';
import { PathContext } from '../../../contexts/PathContext';
import styled from 'styled-components';

const SideBar = ({
  isTrash,
  checkedState,
  setMessages,
  setLoading,
  messages,
  user
}) => {
  const location = useLocation();
  const history = useHistory();
  const { path, setPath } = useContext(PathContext);

  // Set path on location change
  useEffect(() => {
    // console.log('path', path);
    // console.log('location.pathname', getPath(location.pathname));
    if (path !== getPath(location.pathname)) {
      localStorage.removeItem('message');
    }
    setPath(getPath(location.pathname));
    // localStorage.removeItem('message');
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
      path: path
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', user.token);

    const options = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(updates)
    };

    fetch(`/api/messages/`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        localStorage.removeItem('message');
        setMessages(data.data);
        setPath(getPath(location.pathname));
        history.push(`/mail/${path}`);
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
      toBeDeleted: deleted
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', user.token);

    const options = {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(updates)
    };

    fetch(`/api/messages/delete`, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        localStorage.removeItem('message');
        setMessages(data.data.length > 0 ? data.data : []);
        setPath(getPath(location.pathname));
        history.push(`/mail/${path}`);
      });
  };

  return (
    <div className=".mailbox-sidebar-container">
      <div className="mailbox-sidebar">
        <div className="mailbox-sidebar-header">
          <button
            className="compose-message"
            onClick={() => {
              setPath('message');
              history.push('/mail/message');
            }}
          >
            Compose
          </button>
          {isTrash && location.pathname.includes('trash') ? (
            <button className="remove-message" onClick={handleDeleteClick}>
              Delete
            </button>
          ) : isTrash ? (
            <button className="remove-message" onClick={handleTrashClick}>
              Trash
            </button>
          ) : (
            ''
          )}
        </div>

        <ul className="mailbox-sidebar-options">
          <ListItem>
            <Link
              style={{
                border:
                  location.pathname.includes('inbox') && '1px solid #e1e8ed'
              }}
              to="/mail/inbox"
            >
              Inbox
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{
                border:
                  location.pathname.includes('unread') && '1px solid #e1e8ed'
              }}
              to="/mail/unread"
            >
              Unread
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{
                border:
                  location.pathname.includes('sent') && '1px solid #e1e8ed'
              }}
              to="/mail/sent"
            >
              Sent
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{
                border:
                  location.pathname.includes('trash') && '1px solid #e1e8ed'
              }}
              to="/mail/trash"
            >
              Trash
            </Link>
          </ListItem>
        </ul>
      </div>
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
