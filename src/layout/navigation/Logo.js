import { Link } from 'react-router-dom';
import { GiWaterBolt } from 'react-icons/gi';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';

const Logo = () => {
  const { auth } = useAuth();

  return (
    <Div className="logo">
      <Anchor className="logo-anchor" to={auth ? 'me' : '/'} title="Magic Find logo">
        <SVG>
          <GiWaterBolt />
        </SVG>
        <Title>
          <Text>Magic</Text>
          <Text>Find</Text>
        </Title>
      </Anchor>
    </Div>
  )
}

const Div = styled.div`
height: inherit;
display: flex;
align-items: center;

&:hover {
  cursor: pointer;
}
`;
const Anchor = styled(Link)`
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
