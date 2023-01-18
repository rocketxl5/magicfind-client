import React from 'react';

import styled from 'styled-components';

const MailHeader = ({ checked, handleChange, path }) => {
  return (
    <header className="mailbox-header">
      <input
        className="mail-checkbox"
        type="checkbox"
        id="checkAll"
        checked={checked}
        onChange={handleChange}
      />
      <div className="mailbox-section-1">
        {path === 'sent' ? (
          <h2 className="row-to">To</h2>
        ) : path === 'trash' ? (
          <h2></h2>
        ) : (
          <h2 className="row-from">From</h2>
        )}
      </div>

      <div className="mailbox-section-2">
        <h2 className="row-subject">Subject</h2>
        <h2 className="row-sent">Sent</h2>
      </div>
    </header>
  );
};

const Check = styled.div`
  position: relative;
  width: 10%;
`;
const Checkbox = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

const From = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 0;
  color: #fff;
  background: #636363;
`;
const Sent = styled.div``;
const Subject = styled.div`
  width: 50%;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  margin-left: -7px;
  padding-left: 0;
`;
export default MailHeader;
