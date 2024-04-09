import React from 'react';
import Header from './Header';
import Title from './Title';
import Container from './Container';
import data from '../data/PAGES.json';

const Page = ({ children, name, hasHeader = true, component, text }) => {
    const { id, classList, header, title } = data[name];
    return (

        <Container id={id} classList={classList}>

            {
                hasHeader && 
                <Header {...header}>
                        <Title classList={title.classList}>
                            {
                                text?.length < 35 ?
                                    text :
                                    `${text?.substring(0, 30)}...`
                            }
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
