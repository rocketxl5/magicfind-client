import { FiMail } from 'react-icons/fi';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useHamburger from '../../../hooks/useHamburger';
import useViewport from '../../../hooks/contexthooks/useViewport';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import styled from 'styled-components';

const MailBtn = () => {
  const { unreadMail } = useAuth();
  const { isMobile } = useViewport();
  const { hamburgerRef } = useNavbar();
  const { resetHamburger } = useHamburger(hamburgerRef);

  return (
    <button
      id='mail-btn' className='nav-btn mail-btn' onClick={() => resetHamburger('me/mail')}>
        {unreadMail > 0 && (
          <UnreadContainer>
            <Unread>{unreadMail}</Unread>
          </UnreadContainer>
        )}
      <FiMail />
    </button>
  )
}


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

export default MailBtn;
