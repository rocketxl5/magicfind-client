import React from 'react';
import frank from '../../assets/img/frank.png'

const About = () => {
  return (<>
    <section className="feature-section about-me">
      <div className="col-3 img-container">
        <img src={frank} alt="Frankenstein" />
      </div>
      <div className="feature col-9">

      </div>
    </section>
    <section className="feature-section about-me">
      <div className="feature col-8">

      </div>
      <div className="col-4 quarter-green">
      </div>
    </section>
    <section className="media-scroller">
      <div className="fifth-square media-element mtg-blue">
        <img style={{ color: 'white' }} src="https://svgs.scryfall.io/card-symbols/U.svg" alt="" />
      </div>
      <div className="fifth-square media-element mtg-green">
        <img style={{ color: 'white' }} src="https://svgs.scryfall.io/card-symbols/G.svg" alt="" />
      </div>
      <div className="fifth-square media-element mtg-red">
        <img style={{ color: 'white' }} src="https://svgs.scryfall.io/card-symbols/R.svg" alt="" />
      </div>
      <div className="fifth-square media-element mtg-white">
        <img style={{ color: 'white' }} src="https://svgs.scryfall.io/card-symbols/W.svg" alt="" />
      </div>
      <div className="fifth-square media-element mtg-black">
        <img style={{ color: 'white' }} src="https://svgs.scryfall.io/card-symbols/B.svg" alt="" />
      </div>
    </section>
  </>
  );
};

export default About;
