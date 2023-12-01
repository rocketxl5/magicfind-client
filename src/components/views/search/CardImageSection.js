import CardImage from './CardImage';
import ExpandIcon from './ExpandIcon';

const CardImageSection = (props) => {
  const { cardImageRef, handleClick, attributes } = props;
  return (
    <section className="card-section">
      <CardImage attributes={attributes} handleClick={handleClick} ref={cardImageRef} />
      <ExpandIcon />
    </section>
  )
}

export default CardImageSection;
