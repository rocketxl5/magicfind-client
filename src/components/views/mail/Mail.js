import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import timestampConverter from '../../utilities/timestampConverter';
import { PathContext } from '../../../contexts/PathContext';
import styled from 'styled-components';

const Mail = ({
  handleChange,
  setCurrentMessage,
  checkedState,
  message,
  index
}) => {
  const { path } = useContext(PathContext);

  return (
    <div
      className="mail-row"
      style={{
        backgroundColor: message.isRead ? '#e3e3e3' : ''
      }}
    >
      <input
        className="mail-checkbox"
        type="checkbox"
        id={`checkbox${index}`}
        checked={false || checkedState[index]}
        onChange={(e) => {
          handleChange(e, index);
        }}
        style={{ background: message.read ? '#f5f8fa' : '' }}
      />
      <Link
        className="mail-message"
        onClick={(e) => {
          // Prevents leakage of click event on checkbox
          e.stopPropagation();
          setCurrentMessage(message);
          localStorage.setItem('message', JSON.stringify(message));
        }}
        style={{
          backgroundColor: message.isRead ? '#e3e3e3' : ''
        }}
        to={`/mail/${path}/${message._id}`}
        id={index}
      >
        <div className="mailbox-section-1">
          <div className="row-from">
            {path === 'inbox' || path === 'unread'
              ? message.sender
              : path === 'sent'
              ? message.recipient
              : ''}
          </div>
        </div>
        <div className="mailbox-row mailbox-section-2">
          <div className="row-subject">{message.subject}</div>

          <div className="row-sent">
            {document.body.clientWidth > 500
              ? timestampConverter.longDate(message.date)
              : timestampConverter.shortDate(message.date)}
          </div>
        </div>
      </Link>
    </div>
  );
};
const Check = styled.div`
  position: relative;
  width: 10%;
`;

const Date = styled.div`
  font-size: 0.9rem;
`;
const From = styled.div`
  width: 30%;
`;
const Message = styled(Link)``;

const Subject = styled.div`
  width: 50%;
`;

export default Mail;
