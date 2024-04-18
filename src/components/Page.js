import { useState, useEffect } from 'react';
import Header from './Header';
import Title from './Title';
import data from '../data/PAGES.json';

const Page = ({ children, classList, name, hasHeader = true, hasBanner = false, component, title }) => {
    const [titleText, setTitleText] = useState('');
    const { id, style, header, main } = data[name];
    // console.log(title.text)
    console.log(title)
    useEffect(() => {

    }, [])
    return (
        <div id={id} className={style}>
            {
                hasHeader && 
                <Header {...header}>
                        <Title classList='page-title'>
                            {
                                title.length < 35 ?
                                    title :
                                    `${title.substring(0, 30)}...`
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
