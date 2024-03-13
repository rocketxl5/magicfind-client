import { GiWaterBolt } from 'react-icons/gi';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useNavButton from '../../../hooks/useNavButton';
import styled from 'styled-components';

const Logo = () => {
  const { isAuth } = useAuth();

  const { navButtonHandler } = useNavButton();

  return (
    <button
      id='logo-btn'
      className='logo bg-transparent'
      type='button'
      title='Magic Find logo'
      onClick={(e) => navButtonHandler(isAuth ? 'me' : '/')}
    >
      <Anchor id={'logo-icon'}>
        <SVG>
          <GiWaterBolt />
        </SVG>
        <Title>
          <Text>Magic</Text>
          <Text>Find</Text>
        </Title>
      </Anchor>
    </button>
  )
}


const Anchor = styled.span`
display: flex;
align-items: center;
`;


const SVG = styled.div`
display: inline-block;
svg {
  font-size: 3.4rem;
  display: block;
}
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (width >= 725px) {
      flex-direction: row;
      align-items: center;
    }
`;

const Text = styled.div`
  font-family: 'Young Serif', serif;
  font-size: 1.8rem;
  line-height: 1;
  margin-inline-start: 5px;

  @media (width >= 725px) {
    font-size: 2.8rem;
  }
`;


export default Logo;
// import { useNavigate } from 'react-router-dom';
// import { GiWaterBolt } from 'react-icons/gi';
// import styled from 'styled-components';
// import useAuth from '../../hooks/contexthooks/useAuth';
// import useNavbar from '../../hooks/contexthooks/useNavbar';

// const Logo = () => {
//   const navigate = useNavigate();

//   const { auth } = useAuth();
//   const { displayMenu, setDisplayMenu } = useNavbar();

//   const handleClick = () => {
//     if (displayMenu) {
//       setDisplayMenu(false);
//     }
//     navigate(auth ? 'me' : '/')
//   }


// id='logo-btn'
// className='nav-btn logo logo-btn'
// type='button'
// title='Magic Find logo'
// onClick={handleClick}
// >
//   <Span id={'logo-icon'} className="logo-Span" to={auth ? 'me' : '/'} title="Magic Find logo">
//     <SVG>"
//       <GiWaterBolt />
//     </SVG>
//     <Title>
//       <Text>Magic</Text>
//       <Text>Find</Text>
//     </Title>
//   </Span>