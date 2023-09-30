import React from 'react'
import { Link } from 'react-router-dom';
import { GiHypersonicBolt } from 'react-icons/gi';
import styled from 'styled-components';

const LogoBtn = () => {
  return (
    <Logo >
      <Anchor to="/" title="Magic Find logo">
        <SVG>
          <GiHypersonicBolt size={38} />
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
align-self:center;
  padding-inline: 1rem;
  align-items: center;
`;
const Anchor = styled(Link)`

display: flex;
align-items: center;
`;


const SVG = styled.div`
display: inline-block;
svg {
  display: block;
  color: #d8d6d3;
}
`

const Title = styled.div`
    display: inline-block;
    margin-inline-start: 5px;
`;

const Text = styled.span`
  display: block;
  font-family: 'Young Serif', serif;
  font-size: 2rem;
  line-height: 1.2;
`;


export default LogoBtn;
