import React from 'react';
import Header from './Header';
import Title from './Title';
import Container from './Container';
import Loader from '../layout/Loader';
import data from '../data/PAGES.json';

const Page = ({ children, name, hasHeader = true, component, loading }) => {
    const { id, classList, header, title } = data[name];
    return (

        <Container id={id} classList={classList}>
            {
                hasHeader && 
                <Header {...header}>
                    <Title {...title} />
                    {component}
                </Header>
            }
            {
                    children
            }
        </Container>
    )
}

export default Page
