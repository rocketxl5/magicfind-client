import useColorSymbols from '../../../../hooks/useColorSymbols';
import data from '../../../../assets/data/SEARCH';

const CollectionDetails = ({ product }) => {
    const { set_name, released_at, rarity, type_line, artist, lang, collector_number, finishes, _is_published } = product;
    // console.log(product)
    const { colorIdentity, manaCost } = useColorSymbols(product);
    // <span className={`${product.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''} card-spec-value`}>{capitalizeWord(product.finishes[0])}</span>
    return (
        <div className="collection-details border-danger">
            <table className="table">
                <tbody>
                    <tr>
                        <td>Edition:</td>
                        <td>{set_name}</td>
                    </tr>
                    <tr>
                        <td>Year:</td>
                        <td>{`${released_at?.split('-')[0]}`}</td>
                    </tr>
                    <tr>
                        <td>Rarity:</td>
                        <td>{rarity.charAt(0).toUpperCase()}{rarity.substring(1)}</td>
                    </tr>
                    <tr>
                        <td>Type:</td>
                        {

                            !type_line?.includes('—') ? (
                                <td>{type_line}</td>
                            ) : (
                                <td>{type_line?.split('—')[0]}</td>
                            )
                        }
                    </tr>
                    <tr>
                        <td>Identity:</td>
                        <td className="color-identity">{colorIdentity.length ? colorIdentity.map((color) => color) : 'Colorless'}</td>
                    </tr>
                    <tr>
                        <td >Cast:</td>
                        <td className="color-identity">{manaCost && manaCost.map((color) => color)}</td>
                    </tr>
                    <tr>
                        <td>Artist:</td>
                        <td>{artist}</td>
                    </tr>
                    <tr>
                        <td>Language:</td>
                        <td>{`${data.product.languages[lang]}`}</td>
                    </tr>
                    <tr>
                        <td>Collector #:</td>
                        <td>{collector_number}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CollectionDetails
