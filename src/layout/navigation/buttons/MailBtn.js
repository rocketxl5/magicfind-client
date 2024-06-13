import { useNavigate } from 'react-router-dom';
import useMailContext from '../../../hooks/contexthooks/useMailContext';
import useNavContext from '../../../hooks/contexthooks/useNavContext';
import { FiMail } from 'react-icons/fi';

const MailBtn = () => {
  const { mailCount } = useMailContext();
  const { mailCountRef } = useNavContext();

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
