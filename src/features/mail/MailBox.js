import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Aside from '../../components/Aside';
import SideBar from './SideBar';
import MailHeader from './MailHeader';
// import Mail from './Mail';
import ComposeMessage from './ComposeMessage';
import Loader from '../../layout/Loader';
import Message from './Message';
import useAuth from '../../hooks/contexthooks/useAuth';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import { mailReducer } from './services/mailReducer';

const MailBox = () => {
  const { auth, setUnreadMail } = useAuth();
  // const { pathname, setPathname } = useContext(PathContext);

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

  useEffect(() => {


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

    // fetch(`${api.serverURL}/api/mail/${auth.user.id}`, options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.data) {
    //       // console.log(data.data);
    //       if (location.pathname.includes('inbox') || location.pathname.includes('unread')) {
    //         const unreadMail = data.data.filter((message) => {
    //           return !message.isRead && !message.isTrash;
    //         });

    //         setUnreadMail(unreadMail.length);
    //       }
    //       setMessages(data.data);
    //     } else {
    //       setMessages([]);
    //     }

    //     setLoading(false);
    //   })
    //   .catch((error) => console.log(error));

  }, [location]);

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
      navigate(`/me/mail/${location.pathname.split('/')[2]}`);
    }
  };
  // console.log(path);
  return (

    <div className="col-12 bg-grey height-100 padding-2">

      <SideBar
        isTrash={isTrash}
        checkedState={checkedState}
        setMessages={setMessages}
        setLoading={setLoading}
        messages={messages}
        user={auth}
      />
      {
        location.pathname.includes('unread') ?
          <div>Unread</div> :
          location.pathname.includes('sent') ?
            <div>Sent</div> :
            location.pathname.includes('trash') ?
              <div>Trash</div> :
              location.pathname.includes('message') ?
                <div>New Message</div> :
                <div>Inbox</div>
      }

      {/*<div className="mailbox-content">
          {location.pathname === '/mail/inbox' ||
            location.pathname === '/mail/sent' ||
            location.pathname === '/mail/unread' ||
            location.pathname === '/mail/trash' ? (
              <>
              <MailHeader
                handleChange={handleChange}
                checked={checked}
                pathname={pathname}
                checkedState={checkedState}
                messages={messages}
              />
              <Messages>
                {loading || !messages ? (
                    <Loader />
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
                        userID={auth.user.id}
                      />
                    );
                  })
                )}
              </Messages>
              </>
          ) : pathname === 'message' ? (
            <ComposeMessage />
          ) : (
            <Message
              currentMessage={currentMessage}
              setMessages={setMessages}
              setLoading={setLoading}
            />
          )}
        </div>*/}

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

export default MailBox;
