import useColorSymbols from '../../../../hooks/useColorSymbols';
import capitalizeWord from '../../../../assets/utilities/capitalizeWord';
import getYear from '../../../../assets/utilities/getYear';
import data from '../../../../assets/data/SEARCH';

const ArchiveDetails = ({ product }) => {
    const { colorIdentity, manaCost } = useColorSymbols(product);
    return (
        <div className="row">

            <div className="column specs">
                <p>Type:</p>
                <p className="color-identity">Color:</p>
                <p className="color-identity">Mana:</p>
                <p>Year: </p>
                <p>Rarity: </p>
                <p>Language: </p>
                <p>Collector #: </p>
                <p>Artist: </p>
                <p>Frame:</p>
                {
                    !product.finishes.includes('nonfoil') &&
                    <p>Finish:</p>
                }
            </div>
            <div className="column values">
                <p>{product.type_line.split('—')[0]}</p>
                {
                    product.color_identity &&
                    <p className="color-identity">{colorIdentity.lenght ? colorIdentity.map((id, i) => id) : 'Colorless'}</p>
                }

                <p className="color-identity">{manaCost && manaCost.map((id, i) => id)}</p>
                <p>{`${getYear(product.released_at)}`}</p>
                <p>{`${capitalizeWord(product.rarity)}`}</p>
                <p>{`${data.product.languages[product.lang]}`}</p>
                <p>{product.collector_number}</p>
                <p>{product.artist}</p>
                <p>{product.frame}</p>
                {
                    !product.finishes.includes('nonfoil') &&

                    <p className={`${product.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''}`}>
                        {` ${capitalizeWord(product.finishes[0])}`}
                    </p>

                }

            </div>
        </div>
    )
}

export default ArchiveDetails
