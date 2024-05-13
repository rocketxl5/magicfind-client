import { useNavigate } from 'react-router-dom';
import useMail from '../../../hooks/contexthooks/useMail';
import useNav from '../../../hooks/contexthooks/useNavbar';
import { FiMail } from 'react-icons/fi';

const MailBtn = () => {
  const { mailCount } = useMail();
  const { mailCountRef } = useNav();

  const navigate = useNavigate();

  return (
    <button
      id='mail-btn'
      className='nav-btn mail-btn relative'
      onClick={() => navigate('/me/mail/inbox')}>
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
