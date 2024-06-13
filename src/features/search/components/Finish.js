import finishes from '../../../data/FINISHES.json';

const Finish = ({ finish }) => {
    return (
        <div className={`finish ${finish}`}>
            {finishes.type[finish]}
        </div>
    )
}

export default Finish
