import useMail from '../../../hooks/contexthooks/useMail';
import useNavButton from '../../../hooks/useNavButton';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import { FiMail } from 'react-icons/fi';

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
      <div className='count-icon absolute bg-primary' ref={mailCountRef}>
        <span className='count'>
          {unreadCount}
        </span>
      </div>
      {/* )} */}
      <FiMail />
    </button>
  )
}

export default MailBtn;
