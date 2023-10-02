import React from 'react'
import { Link } from 'react-router-dom';
import { GiWaterBolt } from 'react-icons/gi';
import styled from 'styled-components';

const LogoBtn = () => {
  return (
    <Logo className="nav-btn">
      <Anchor to="/" title="Magic Find logo">
        <SVG>
          <GiWaterBolt />
        </SVG>
        <Title>
          <Text>Magic</Text>
          <Text>Find</Text>
        </Title>
      </Anchor>
    </Logo>
  )
}

const Logo = styled.div`
height: inherit;
display: flex;
align-items: center;

`;
const Anchor = styled(Link)`
display: flex;
align-items: center;
 height: inherit;
`;


const SVG = styled.div`
display: inline-block;
svg {
  font-size: 3.4rem;
  display: block;
  color: #d8d6d3;
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


export default LogoBtn;
