import CardImage from './CardImage';
import ExpandIcon from './ExpandIcon';

const CardImageSection = (props) => {
  const { ref, handleClick, attributes } = props;
  return (
    <section className="card-section">
      <CardImage attributes={attributes} handleClick={handleClick} ref={ref} />
      <ExpandIcon />
    </section>
  )
}

export default CardImageSection;
