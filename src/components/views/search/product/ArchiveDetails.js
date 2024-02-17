import useColorSymbols from '../../../../hooks/useColorSymbols';
import data from '../../../../assets/data/SEARCH';

const ArchiveDetails = ({ product }) => {
    const { colorIdentity, manaCost } = useColorSymbols(product);
    const { languages } = data.product;
    const { set_name, released_at, rarity, type_line, artist, lang, collector_number } = product;
    return (
        <div className="archive-details">
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
                    <td>{type_line.split('—')[0]}</td>
                </tr>
                <tr>
                    <td>Sub Type:</td>
                    <td>{type_line.split('—')[1]}</td>
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
                    <td>{`${languages[lang]}`}</td>
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

export default ArchiveDetails
