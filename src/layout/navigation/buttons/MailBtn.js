import { FiMail } from 'react-icons/fi';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useNavButton from '../../../hooks/useNavButton';
import useNavbar from '../../../hooks/contexthooks/useNavbar';

const MailBtn = () => {
  const { unreadMail } = useAuth();
  const { mailCountRef } = useNavbar();
  const { navButtonHandler } = useNavButton();

  return (
    <button
      id='mail-btn'
      className='nav-btn mail-btn relative'
      onClick={(e) => navButtonHandler('/me/mail/inbox')}>
      {/* {unreadMail > 0 && ( */}
      <div className={'cart-count absolute flex column justify-center align-center bg-primary'} ref={mailCountRef}>
        <span>
          {unreadMail}
        </span>
      </div>
      {/* )} */}
      <FiMail />
    </button>
  )
}

export default MailBtn;
