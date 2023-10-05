import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import styled from 'styled-components';

const MailIcon = () => {
    const { unreadMail } = useContext(UserContext);
    return (
      <Div>
        <Mail className="nav-btn mail-btn" to="/mail/inbox" title=" To Mailbox">
          {unreadMail > 0 && (
            <UnreadContainer>
              <Unread>{unreadMail}</Unread>
            </UnreadContainer>
          )}
          <FiMail className="nav-icon" size={27} />
        </Mail>
      </Div>
    )
}



const Div = styled.div`
  position: relative;
  display: flex;
`;

const Mail = styled(Link)`
   color: var(--clr-grey);
`;

const UnreadContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background-color: #28a745;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 10;
`;

const Unread = styled.div`
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
`;

export default MailIcon;
