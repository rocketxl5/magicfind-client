import React from 'react';
import Header from './Header';
import Title from './Title';
import Div from './Div';
import data from '../data/PAGE.json';

const Page = ({ children, name, component }) => {
    const { classList, header, title } = data[name];
    return (
        <Div classList={classList}>
            <Header {...header}>
                <Title {...title} />
                {component}
            </Header>
            {children}
        </Div>
    )
}

export default Page
