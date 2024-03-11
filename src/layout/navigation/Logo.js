import { GiWaterBolt } from 'react-icons/gi';
import styled from 'styled-components';
import useAuth from '../../hooks/contexthooks/useAuth';
import useNavbar from '../../hooks/contexthooks/useNavbar';
import useHamburger from '../../hooks/useHamburger';

const Logo = () => {
  const { auth } = useAuth();
  const { hamburgerRef } = useNavbar();
  const { resetHamburger } = useHamburger(hamburgerRef)


  return (
    <button
      id='logo-btn'
      className='logo bg-transparent'
      type='button'
      title='Magic Find logo'
      onClick={() => resetHamburger(auth ? 'me' : '/')}
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