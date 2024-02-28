import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import data from '../../../data/SEARCH.json';

const CatalogDetails = ({ product }) => {
    const { isAuth } = useAuth();
    const { conditions, finishes, languages } = data.product;
    const { set_name, released_at, price, type_line, name, language, userName, comment, country, condition, card_faces, oversized, avatar, rating, joined } = product;
    console.log(product)
    return (
        <>
            <div className="catalog-details">
                <table className="table">
                    <tbody>
                        {/* <tr>
                            <th>Card Information</th>
                        </tr>
                        <tr>
                            <td>Name: </td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Edition:</td>
                            <td>{set_name}</td>
                        </tr> */}
                        {/* <tr>
                            <td>Year:</td>
                            <td>{`${released_at?.split('-')[0]}`}</td>
                        </tr> */}
                        {/* <tr>
                        <td>Rarity:</td>
                        <td>{rarity.charAt(0).toUpperCase()}{rarity.substring(1)}</td>
                    </tr> */}
                        {/* <tr>
                        <td>Type:</td>
                        <td>{type_line.split('—')[0]}</td>
                    </tr>
                    <tr>
                        <td>Sub Type:</td>
                        <td>{type_line.split('—')[1]}</td>
                    </tr> */}

                        <tr>
                            <td>Edition:</td>
                            <td>{set_name}</td>
                        </tr>
                        <tr>
                            <td>Condition:</td>
                            <td>{conditions[condition]}</td>
                        </tr>
                        <tr>
                            <td>Language:</td>
                            <td>{languages[language]}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>{price}</td>
                        </tr>
                        <tr>
                            <td>Language:</td>
                            <td>{languages[language]}</td>
                        </tr>
                        <tr>
                            <td>Seller:</td>
                            <td>{userName}</td>
                        </tr>
                        <tr>
                            <td>Avatar:</td>
                            <td>{avatar}</td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td>{rating}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

        // <div className="card-info">
        //     <div className="card-spec">
        //         <p><span className="card-spec-title">Seller:</span>  <span className="card-spec-value">{card.userName}</span></p>
        //     </div>
        //     <div className="card-spec">
        //         <p><span className="card-spec-title">Condition:</span> <span className="card-spec-value">{card.condition.toUpperCase()}</span></p>
        //     </div>
        //     <div className="card-spec">
        //         <p><span className="card-spec-title">Ships From:</span>  <span className="card-spec-value">{card.userCountry}</span></p>
        //     </div>
        //     <div className="card-spec">
        //         <p><span className="card-spec-title">Price:</span>  <span className="card-spec-value">{card.price}</span></p>
        //     </div>
        //     <div className="card-spec">
        //         <p><span className="card-spec-title">Quantity available:</span>  <span className="card-spec-value">{quantityAvailable}</span></p>
        //     </div>
        //     {isAuth && (
        //         <div className="contact-user">
        //             <Contact
        //                 to={{
        //                     pathname: '/mail/message',
        //                     state: { sender: card.userName, subject: card.name },
        //                 }}
        //             >
        //                 Contact Seller
        //             </Contact>
        //         </div>
        //     )}

        // </div>
    )
}

export default CatalogDetails
