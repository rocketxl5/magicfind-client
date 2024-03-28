import React from 'react';
import Header from './Header';
import Title from './Title';
import Container from './Container';
import data from '../data/PAGES.json';

const Page = ({ children, name, hasHeader = true, component }) => {
    const { id, classList, header, title } = data[name];
    return (

        <Container id={id} classList={classList}>

            {
                hasHeader && 
                <Header {...header}>
                        <Title classList={title.classList}>
                            {title.text}
                        </Title>
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
