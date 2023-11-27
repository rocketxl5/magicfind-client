import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Card from './Card';
import NotFound from './NotFound';
import capitalizeString from '../../../utilities/capitalizeString';

const SearchResult = () => {
    const location = useLocation();
    const { cards, cardName, type, search } = location.state;
    return (
        <>

            <div className="search-result">
                <header className="search-result-header">
                    {type !== 'search-catalog' &&
                        <div className="back-link">
                            <Link to={search}>{<FiChevronLeft />} Back to Search</Link>
                        </div>
                    }
                    <div className="search-result-info">
                        <h3>{cardName ? capitalizeString(cardName) : 'Search Results'}</h3>
                        <span>
                            {
                                cards ?
                                    `${cards.length} ${cards.length > 1 ? 'Cards' : 'Card'}` :
                                    'No results'
                            }
                        </span>
                    </div>
                </header>
                {
                    type === 'not-found' ?
                        (
                            <NotFound cardName={cardName} />
                        ) : (
                            <div className="cards">
                                {cards &&
                                    cards.map((card, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                card={card}
                                                searchType={type}
                                            />)
                                    })
                                }
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default SearchResult;
