import React from 'react';
import Header from './Header';
import Title from './Title';
import data from '../data/PAGES.json';

const Page = ({ children, classList, name, hasHeader = true, hasBanner = false, component, text }) => {
    const { id, style, header, title, main } = data[name];

    return (
        <div id={id} className={style}>
            {
                hasHeader && 
                <Header {...header}>
                        <Title classList={title.style}>
                            {
                                title.text?.length < 35 ?
                                    text :
                                    `${text?.substring(0, 30)}...`
                            }
                        </Title>
                    {component}
                </Header>
            }
            <main className={`padding-inline-1 ${main && main.style}`}>
                {children}
            </main>
        </div>
    )
}

export default Page
