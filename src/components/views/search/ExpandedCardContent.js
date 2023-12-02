import FlipIcon from './FlipIcon'

const ExpandedCardContent = ({ children, handleClick }) => {

    return (
        <div className="expanded-card" onClick={handleClick}>
            {children}
        </div>
    )
}

export default ExpandedCardContent;
