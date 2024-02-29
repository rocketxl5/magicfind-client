import React from 'react';
import Header from './Header';
import Title from './Title';
import Container from './Container';
import data from '../data/PAGES.json';

const Page = ({ children, name, component }) => {
    const { classList, header, title } = data[name];
    return (
        <Container classList={classList}>
            <Header {...header}>
                <Title {...title} />
                {component}
            </Header>
            {children}
        </Container>
    )
}

export default Page
