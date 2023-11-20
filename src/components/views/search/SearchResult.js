import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Card from './Card';
import capitalizeString from '../../../utilities/capitalizeString';


const SearchResult = () => {
    const location = useLocation();
    const { cards, cardName, type } = location.state;

    return (

        <div className="search-result">
            <header className="search-result-header">
                {type !== 'search-catalog' &&
                    <div className="back-link">
                        <Link to='/search-api'>{<FiChevronLeft />} Back to Search</Link>
                    </div>
                }
                <div className="search-result-info">
                    <h3>{capitalizeString(cardName)}</h3>
                    <span>
                        {`${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}`}
                    </span>
                </div>
            </header>
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
        </div>

    )
}

export default SearchResult;
