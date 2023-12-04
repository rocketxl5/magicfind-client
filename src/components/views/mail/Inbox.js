import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import MailHeader from './MailHeader';
import Mail from './Mail';
import ComposeMessage from './ComposeMessage';
import Loading from '../../layout/Loading';
import Message from './Message';
import useAuth from '../../../hooks/useAuth';
import getPath from '../../../utilities/getPath';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';
import styled from 'styled-components';

const Inbox = () => {
  const { auth, setUnreadMail } = useAuth();
  const { pathname, setPathname } = useContext(PathContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  // Message selected on click by user. Passed to Conversation. Set in Mail
  const [currentMessage, setCurrentMessage] = useState(
    localStorage.getItem('message')
      ? JSON.parse(localStorage.getItem('message'))
      : {}
  );
  const [checked, setChecked] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const [checkedState, setCheckedState] = useState([]);

  // Set path on page load
  useEffect(() => {
    // console.log(path);
    setPathname(getPath(location.pathname));
  }, []);

  useEffect(() => {
    // console.log('path', path);
    if (pathname !== 'message' && pathname) {
      // console.log(path);
      setLoading(true);
      // setPath(location.pathname.split('/')[2]);
      setChecked(false);

      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      headers.append('auth-token', auth.token);

      const options = {
        method: 'GET',
        headers: headers,
      };

      fetch(`${api.serverURL}/api/messages/${pathname}/${auth.id}`, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            // console.log(data.data);
            if (pathname === 'inbox' || pathname === 'unread') {
              const unreadMail = data.data.filter((message) => {
                return !message.isRead && !message.isTrash;
              });

              setUnreadMail(unreadMail.length);
            }
            setMessages(data.data);
          } else {
            setMessages([]);
          }

          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [pathname]);

  // Populate checkedState on page reload/refresh
  useEffect(() => {
    // If 'message' key value is defined in localStorage, it means
    // that a single message selected is the current view.
    // When that is the case needs to stay as is.
    if (!localStorage.getItem('message')) {
      setCheckedState(new Array(messages.length).fill(checked));
    }
  }, [messages]);

  useEffect(() => {
    setCheckedState(new Array(messages.length).fill(checked));
    console.log(checked)
    if (checked) {
      setIsTrash(true);
    } else {
      setIsTrash(false);
    }
  }, [checked]);

  // Triggers display of delete button in sidebar
  useEffect(() => {
    const isChecked = checkedState.find((state) => {
      return state === true;
    });

    if (checked) {
      if (!checkedState.includes(true)) {
        setChecked(false);
      }
    }
    if (isChecked) {
      setIsTrash(true);
    } else {
      setIsTrash(false);
    }
  }, [checkedState]);

  const handleChange = (e, position) => {
    // Trigger all checkbox state change with useEffect above
    if (e.target.id === 'checkAll') {
      setChecked(!checked);
    } else if (e.target.type === 'checkbox') {
      // Set individual checkbox state
      const newCheckedState = checkedState.map((state, index) => {
        return position === index ? !state : state;
      });

      setCheckedState(newCheckedState);
      localStorage.setItem('checkedState', JSON.stringify(newCheckedState));
      navigate(`/mail/${location.pathname.split('/')[2]}`);
    }
  };
  // console.log(path);
  return (
    <div className="content inbox">
      <header className="header">
        <h2 className="title">Inbox</h2>
      </header>
      <main className="main">
        <div className="mailbox-aside">
          <SideBar
            isTrash={isTrash}
            checkedState={checkedState}
            setMessages={setMessages}
            setLoading={setLoading}
            messages={messages}
            user={auth}
          />
        </div>
        <div className="mailbox-content">
          {location.pathname === '/mail/inbox' ||
            location.pathname === '/mail/sent' ||
            location.pathname === '/mail/unread' ||
            location.pathname === '/mail/trash' ? (
            <Fragment>
              <MailHeader
                handleChange={handleChange}
                checked={checked}
                pathname={pathname}
                checkedState={checkedState}
                messages={messages}
              />
              <Messages>
                {loading || !messages ? (
                  <Loading />
                ) : (
                  messages.map((message, index) => {
                    return (
                      <Mail
                        key={index}
                        setCurrentMessage={setCurrentMessage}
                        handleChange={handleChange}
                        checkedState={checkedState}
                        message={message}
                        index={index}
                        userID={auth.id}
                      />
                    );
                  })
                )}
              </Messages>
            </Fragment>
          ) : pathname === 'message' ? (
            <ComposeMessage />
          ) : (
            <Message
              currentMessage={currentMessage}
              setMessages={setMessages}
              setLoading={setLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: 80%;
  padding: 10px;
  border: 1px solid #f5f8fa;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 70vh;
`;

const Side = styled.aside`
  width: 20%;
`;

export default Inbox;
