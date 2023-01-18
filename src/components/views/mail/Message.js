import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import timestampConverter from '../../utilities/timestampConverter';
import getPath from '../../utilities/getPath';
import { PathContext } from '../../../contexts/PathContext';
import { UserContext } from '../../../contexts/UserContext';

import styled from 'styled-components';

const Message = ({ currentMessage, setMessages, setLoading }) => {
  const history = useHistory();
  const location = useLocation();
  const { path, setPath } = useContext(PathContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!currentMessage) {
      currentMessage = JSON.parse(localStorage.getItem('message'));
      // localStorage.setItem('message', JSON.stringify(currentMessage));
    }
    localStorage.setItem('message', JSON.stringify(currentMessage));
  }, []);
  // Set isRead status in database for current message
  const setIsReadStatus = (status) => {
    // Reset path value
    // if (!loading) {
    setPath(null);
    setLoading(true);
    const updates = {
      userID: user.id,
      messageID: currentMessage._id,
      isReadStatus: status
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', user.token);

    const options = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(updates)
    };
    fetch(`/api/messages/read`, options)
      .then((res) => res.json())
      .then((data) => {
        // Update path value to trigger useEffect in MailBox component to show updated list
        // of current view

        setLoading(false);
        setPath(getPath(location.pathname));
        if (currentMessage.isRead) {
          history.push(`/mail/${path}`);
        }
      })
      .catch((error) => console.log(error));
  };

  // Set isTrash status in database for current message
  const setIsTrashStatus = (status) => {
    setPath(null);

    setLoading(true);

    const updates = {
      userID: user.id,
      messageID: currentMessage._id,
      isSentMessage: currentMessage.isSent,
      isTrashStatus: status
    };
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('auth-token', user.token);

    const options = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(updates)
    };
    fetch(`/api/messages/trash`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        localStorage.removeItem('message');
        setPath(getPath(location.pathname));
        history.push(`/mail/${path}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (message) => {
    const deleted = [message];

    setLoading(true);

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
        console.log(data);
        setPath(getPath(location.pathname));
        setMessages(data.data.length > 0 ? data.data : []);
        localStorage.removeItem('message');
        history.push(`/mail/${path}`);
      });
  };

  // Change isRead status to true
  useEffect(() => {
    if (!currentMessage.isRead) {
      setIsReadStatus(true);
    }
  }, [location]);
  console.log(currentMessage);
  return (
    <div className="message-container">
      <div>
        <div
          className="go-back"
          onClick={() => {
            localStorage.removeItem('message');
            history.push(`/mail/${path}`);
          }}
        >
          <FiArrowLeftCircle />{' '}
          <p>
            Back To {path && path.charAt(0).toUpperCase() + path.substring(1)}
          </p>
        </div>
        <div className="message-details">
          {path === 'inbox' ? (
            <Detail>
              From: <strong>{currentMessage.sender}</strong>
            </Detail>
          ) : (
            <Detail>
              To: <strong>{currentMessage.recipient}</strong>
            </Detail>
          )}

          <Detail>
            Subject: <strong>{currentMessage.subject}</strong>
          </Detail>
          <div>
            Sent:{' '}
            <strong>{timestampConverter.longDate(currentMessage.date)}</strong>
          </div>
        </div>
        <div className="mail-content">{currentMessage.text}</div>
      </div>
      <div className="item-buttons column">
        <button
          className="item-button row-3 success"
          onClick={() => {
            history.push({ pathname: '/mail/message', state: currentMessage });
          }}
        >
          Reply
        </button>

        {path === 'trash' ? (
          !currentMessage.isSent ? (
            <button
              className="item-button row-3 primary"
              onClick={() => {
                localStorage.removeItem('message');
                setIsTrashStatus(false);
              }}
            >
              Move to Inbox
            </button>
          ) : (
            <button
              className="item-button row-3 primary"
              onClick={() => {
                localStorage.removeItem('message');
                setIsTrashStatus(false);
              }}
            >
              Move to Sent
            </button>
          )
        ) : path === 'inbox' ? (
          <button
            className="item-button row-3 primary"
            onClick={() => {
              // localStorage.removeItem('message');
              setIsReadStatus(false);
              if (!currentMessage.isRead) {
                history.push('/mail/inbox');
              } else {
                localStorage.removeItem('message');
              }
            }}
          >
            Mark As Unread
          </button>
        ) : (
          ''
        )}
        {path !== 'trash' ? (
          <button
            className="item-button row-3 danger"
            onClick={() => {
              setIsTrashStatus(true);
            }}
          >
            Move To Bin
          </button>
        ) : (
          <button
            className="item-button row-3 danger"
            onClick={() => {
              handleDeleteClick(currentMessage);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
const Main = styled.main``;

const Detail = styled.p``;
const Section = styled.section`
  padding: 5px 10px;
  border-bottom: 1px solid #e1e8ed;
  margin-bottom: 25px;
`;
const Content = styled.div`
  padding: 0 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  padding: 7px;
  border: 1px solid #e1e8ed;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Reply = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  padding: 7px;
  border: 1px solid #e1e8ed;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 25px;
`;

const Back = styled.a`
  backgound: none;
  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

export default Message;
