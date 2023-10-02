import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

const AuthBtn = () => {
    return (
        <Auth className="nav-icon">
            <FaUserCircle size={27} />
        </Auth>
    )
}

const Auth = styled.div`
    svg {
        display: block;
    }
`;

export default AuthBtn;
