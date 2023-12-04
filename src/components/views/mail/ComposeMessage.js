import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PathContext } from '../../../contexts/PathContext';
import useAuth from '../../../hooks/useAuth';
import validate from '../../../utilities/validateMessage';
import getPath from '../../../utilities/getPath';
import useMessage from '../../../hooks/useMessage';
import { api } from '../../../api/resources';

const Message = () => {
  const MAXCHARS = 500;
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { setPathname } = useContext(PathContext);
  // When writing to a seller set recipient name to seller name
  const [recipientName, setRecipientName] = useState(
    location.state ? location.state.sender : ''
  );

  const [subject, setSubject] = useState(
    location.state ? location.state.subject : ''
  );
  const [text, setText] = useState('');
  const [messageID, setMessageID] = useState('');
  const [threadID, setThreadID] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('#333333');
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const token = auth.token;
  const userName = auth.name;

  const recipientField = useRef();
  const subjectField = useRef();
  const textField = useRef();

  const callback = (values) => {
    setRecipientName(values.recipient);
    setSubject(values.subject);
    setText(values.text);
    setIsValid(true);
  };

  const { handleChange, values, handleClick, errors } = useMessage(
    callback,
    validate,
    recipientName,
    subject
  );

  useEffect(() => {
    setPathname(getPath(location.pathname));
  });

  useEffect(() => {
    if (!isValid) {
      return console.log('invalid');
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', token);

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        subject,
        userName,
        recipientName,
        text,
        isReply,
        messageID,
        threadID,
      }),
    };

    fetch(`${api.serverURL}/api/messages`, options)
      .then((res) => res.json())
      .then((data) => {
        // Reinitialize states
        setText('');
        setCount(0);
        navigate('/mail/inbox');
      })
      .catch((error) => console.log(error));
  }, [isValid]);

  //  Changes the color of letter count displayed
  useEffect(() => {
    switch (true) {
      case count <= MAXCHARS && count > 450:
        setColor('#ffc107');
        break;
      case count > 500:
        setColor('#dc3545');
        break;
      default:
        setColor('#333333');
    }
  }, [count]);

  return (
    <div className="message-container">
      <main className="content">
        <div className="message-content">
          <section className="message-form">
            <div className={`error-msg`}>{errorMsg}</div>
            <form>
              {errors.recipient ? (
                <p className="error">{errors.recipient}</p>
              ) : (
                <label htmlFor="recipient">Recipient:</label>
              )}
              <input
                className={errors.recipient && 'empty-field'}
                id="recipient"
                type="text"
                name="recipient"
                value={
                  location.state ? location.state.sender : values.recipient
                }
                ref={recipientField}
                onChange={handleChange}
              />
              {errors.subject ? (
                <p className="error">{errors.subject}</p>
              ) : (
                <label htmlFor="subject">Subject:</label>
              )}
              <input
                className={errors.subject && 'empty-field'}
                id="subject"
                type="text"
                name="subject"
                value={location.state ? location.state.subject : values.subject}
                ref={subjectField}
                onChange={handleChange}
              />
              {errors.text ? (
                <p className="error">{errors.text}</p>
              ) : (
                <label htmlFor="text">Message:</label>
              )}
              <textarea
                className={errors.text && 'empty-field'}
                id="text"
                name="text"
                value={values.text}
                ref={textField}
                onChange={(e) => {
                  setCount(e.target.value.length);
                  handleChange(e);
                }}
              ></textarea>

              <footer>
                <span className="word-counter">
                  <span style={{ color: color }}> {count} </span>
                  <span> / {MAXCHARS}</span>
                </span>
                <button className="item-button success" type="button" onClick={handleClick}>
                  Send
                </button>
              </footer>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Message;
