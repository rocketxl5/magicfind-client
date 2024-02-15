import useColorSymbols from '../../../../hooks/useColorSymbols';
import capitalizeWord from '../../../../assets/utilities/capitalizeWord';
import getYear from '../../../../assets/utilities/getYear';
import data from '../../../../assets/data/SEARCH';

const ArchiveDetails = ({ card }) => {
    const { colorIdentity, manaCost } = useColorSymbols(card);
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
                    !card.finishes.includes('nonfoil') &&
                    <p>Finish:</p>
                }
            </div>
            <div className="column values">
                <p>{card.type_line.split('—')[0]}</p>
                {
                    card.color_identity &&
                    <p className="color-identity">{colorIdentity.lenght ? colorIdentity.map((id, i) => id) : 'Colorless'}</p>
                }

                <p className="color-identity">{manaCost && manaCost.map((id, i) => id)}</p>
                <p>{`${getYear(card.released_at)}`}</p>
                <p>{`${capitalizeWord(card.rarity)}`}</p>
                <p>{`${data.product.languages[card.lang]}`}</p>
                <p>{card.collector_number}</p>
                <p>{card.artist}</p>
                <p>{card.frame}</p>
                {
                    !card.finishes.includes('nonfoil') &&

                    <p className={`${card.finishes[0].toLowerCase() === 'foil' ? 'foil-finish' : ''}`}>
                        {` ${capitalizeWord(card.finishes[0])}`}
                    </p>

                }

            </div>
        </div>
    )
}

export default ArchiveDetails
