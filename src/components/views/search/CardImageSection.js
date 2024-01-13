import CardImage from './CardImage';
import ExpandBtn from './cardbtn/ExpandBtn';

const CardImageSection = (props) => {
  return (
    <section className="card-section">
      <CardImage {...props} />
      <ExpandBtn />
    </section>
  )
}

export default CardImageSection;
