import Title from './Title';
import data from '../data/PAGES.json';

const Page = ({ children, classList = '', name, hasHeader = true, hasBanner = false, component, title }) => {
    const { id, style, main } = data[name];

    return (
        <div id={id} className={`${style} ${classList ? classList : ''}`}>
            {
                hasHeader && 
                <header className={'page-header'}>
                        <Title classList='page-title'>
                            {
                                title?.length < 35 ?
                                    title :
                                    `${title?.substring(0, 25)}...`
                            }
                        </Title>
                    {component}
                    </header>
            }
            <main className={`${main ? main.style : ''}`}>
                {children}
            </main>
        </div>
    )
}

export default Page
