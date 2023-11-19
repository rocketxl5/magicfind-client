import CardImage from './CardImage';
import ExpandIcon from './ExpandIcon';

const CardImageSection = (props) => {
  const { attributes, setDisplay } = props;

  const handleClick = () => {
    setDisplay(true);
  }

  return (
    <section className="card-section" onClick={handleClick} >
      <CardImage attributes={attributes} />
      <ExpandIcon />
    </section>
  )
}

export default CardImageSection;
