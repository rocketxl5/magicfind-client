import { Link } from 'react-router-dom';
import { GiWaterBolt } from 'react-icons/gi';
import useAuthContext from '../../../hooks/contexthooks/useAuthContext';

const Logo = () => {
  const { isAuth } = useAuthContext();

  return (
    <Link
      to={isAuth ? 'me' : '/'}
      className='home bg-transparent'
    >
      <span className='logo'>
          <GiWaterBolt />
      </span>
      <h1 className='site-name'>
        <span>Magic</span> <span>Find</span>
      </h1>

    </Link>
  )
}

export default Logo;