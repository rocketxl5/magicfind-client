import useMail from '../../../hooks/contexthooks/useMail';
import useNavButton from '../../../hooks/useNavButton';
import useNav from '../../../hooks/contexthooks/useNavbar';
import { FiMail } from 'react-icons/fi';

const MailBtn = () => {
  const { mailCount } = useMail();
  const { mailCountRef } = useNav();
  const { navButtonHandler } = useNavButton();

  return (
    <button
      id='mail-btn'
      className='nav-btn mail-btn relative'
      onClick={(e) => navButtonHandler('/me/mail/inbox')}>
      {/* {mailCount > 0 && ( */}
      <div className='count-icon absolute bg-primary' ref={mailCountRef}>
        <span>
          {mailCount}
        </span>
      </div>
      {/* )} */}
      <FiMail />
    </button>
  )
}

export default MailBtn;
