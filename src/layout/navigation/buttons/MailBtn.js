import { FiMail } from 'react-icons/fi';
import useMail from '../../../hooks/contexthooks/useMail';
import useNavButton from '../../../hooks/useNavButton';
import useNavbar from '../../../hooks/contexthooks/useNavbar';

const MailBtn = () => {
  const { unreadCount } = useMail();
  const { mailCountRef } = useNavbar();
  const { navButtonHandler } = useNavButton();

  return (
    <button
      id='mail-btn'
      className='nav-btn mail-btn relative'
      onClick={(e) => navButtonHandler('/me/mail/inbox')}>
      {/* {unreadCount > 0 && ( */}
      <div className={'cart-count absolute flex column justify-center align-center bg-primary'} ref={mailCountRef}>
        <span>
          {unreadCount}
        </span>
      </div>
      {/* )} */}
      <FiMail />
    </button>
  )
}

export default MailBtn;
