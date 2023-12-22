import CardImage from './CardImage';
import ExpandIcon from './ExpandIcon';

const CardImageSection = (props) => {
  return (
    <section className="card-section">
      <CardImage {...props} />
      <ExpandIcon />
    </section>
  )
}

export default CardImageSection;
