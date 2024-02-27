import React from 'react';
import Main from './Main';

const Page = ({ children, classList }) => {
    return (
        <Main className={`page ${classList}`}>
            {children}
        </Main>
    )
}

export default Page
